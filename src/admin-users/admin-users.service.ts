import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryAdminUsersDto } from './dto/query-admin-users.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  private toDateOnly(date?: Date | string | null) {
    if (!date) return '-';

    const parsedDate = date instanceof Date ? date : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return '-';
    }

    return parsedDate.toISOString().slice(0, 10);
  }

  private mapBookingStatus(status: string) {
    if (status === 'COMPLETED') return 'completed';

    if (status === 'CANCELLED' || status === 'REJECTED') {
      return 'cancelled';
    }

    return 'upcoming';
  }

  private mapPaymentStatus(status: string) {
    if (status === 'PAID') return 'paid';

    if (status === 'FAILED' || status === 'EXPIRED') {
      return 'cancelled';
    }

    return 'pending';
  }

  private isValidRevenueBooking(status: string) {
    return status !== 'CANCELLED' && status !== 'REJECTED';
  }

async findAll(query: QueryAdminUsersDto) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.perPage && query.perPage > 0 ? query.perPage : 10;
  const skip = (page - 1) * perPage;

  const where: any = {};

  if (query.search) {
    where.OR = [
      {
        email: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      {
        userProfile: {
          fullName: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      },
      {
        userProfile: {
          phone: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      },
      {
        psychologistProfile: {
          fullName: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  if (query.gender && query.gender !== 'all') {
    where.userProfile = {
      ...(where.userProfile || {}),
      gender: query.gender.toUpperCase(),
    };
  }

  let orderBy: any = { createdAt: 'desc' };

  if (query.sort === 'oldest') {
    orderBy = { createdAt: 'asc' };
  }

  if (query.sort === 'name_asc') {
    orderBy = {
      userProfile: {
        fullName: 'asc',
      },
    };
  }

  if (query.sort === 'name_desc') {
    orderBy = {
      userProfile: {
        fullName: 'desc',
      },
    };
  }

  const shouldSortByMostBookings = query.sort === 'most-bookings';

  const [total, totalPatients, totalPsychologists, totalAdmins] =
    await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.count({ where: { role: 'USER' } }),
      this.prisma.user.count({ where: { role: 'PSYCHOLOGIST' } }),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
    ]);

  const users = await this.prisma.user.findMany({
    where,
    ...(shouldSortByMostBookings
      ? {}
      : {
          skip,
          take: perPage,
          orderBy,
        }),
    include: {
      userProfile: true,
      psychologistProfile: true,
    },
  });

  const userIds = users.map((user) => user.id);

  const bookingCounts =
    userIds.length > 0
      ? await this.prisma.booking.groupBy({
          by: ['userId'],
          where: {
            userId: {
              in: userIds,
            },
          },
          _count: {
            id: true,
          },
        })
      : [];

  const bookingCountMap = new Map(
    bookingCounts.map((item) => [item.userId, item._count.id]),
  );

  const mappedUsers = users.map((user) => ({
    id: user.id,
    name:
      user.userProfile?.fullName ||
      user.psychologistProfile?.fullName ||
      '-',
    email: user.email,
    gender: user.userProfile?.gender?.toLowerCase() ?? null,
    phone: user.userProfile?.phone ?? null,
    role: user.role.toLowerCase(),
    status: user.isEmailVerified ? 'active' : 'inactive',
    registeredAt: this.toDateOnly(user.createdAt),
    isEmailVerified: user.isEmailVerified,
    isProfileComplete: user.isProfileComplete,
    bookingCount: bookingCountMap.get(user.id) ?? 0,
  }));

  const finalUsers = shouldSortByMostBookings
    ? mappedUsers
        .sort((a, b) => {
          if ((b.bookingCount || 0) !== (a.bookingCount || 0)) {
            return (b.bookingCount || 0) - (a.bookingCount || 0);
          }

          return String(a.name || '').localeCompare(String(b.name || ''));
        })
        .slice(skip, skip + perPage)
    : mappedUsers;

  return {
    users: finalUsers,
    total,
    totalPages: Math.ceil(total / perPage),
    page,
    perPage,
    meta: {
      totalUsers: total,
      totalPatients,
      totalPsychologists,
      totalAdmins,
    },
  };
}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userProfile: true,
        psychologistProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const bookings = await this.prisma.booking.findMany({
      where: {
        userId: id,
      },
      include: {
        service: true,
        psychologist: true,
        payments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const transactionHistory = bookings.flatMap((booking: any) =>
      (booking.payments || []).map((payment: any) => {
        const paymentStatus = this.mapPaymentStatus(payment.status);
        const isCancelledBooking = !this.isValidRevenueBooking(booking.status);

        return {
          id: payment.id,
          description: `${
            payment.type === 'DOWN_PAYMENT' ? 'DP' : 'Pembayaran'
          } - ${booking.service?.nama || 'Layanan'}`,
          date: this.toDateOnly(payment.paidAt || payment.createdAt),
          amount: payment.amount || 0,
          status: paymentStatus,
          paymentMethod: payment.paymentMethod || payment.method || null,
          bookingId: booking.id,
          bookingStatus: this.mapBookingStatus(booking.status),
          rawBookingStatus: booking.status,
          isCancelledBooking,
          includedInTotal: paymentStatus === 'paid' && !isCancelledBooking,
        };
      }),
    );

    const totalSpent = transactionHistory
      .filter((transaction) => transaction.includedInTotal)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const cancelledTransactionAmount = transactionHistory
      .filter(
        (transaction) =>
          transaction.status === 'paid' && transaction.isCancelledBooking,
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const completedBookings = bookings.filter(
      (booking) => booking.status === 'COMPLETED',
    ).length;

    return {
      id: user.id,
      name:
        user.userProfile?.fullName ||
        user.psychologistProfile?.fullName ||
        '-',
      email: user.email,
      gender: user.userProfile?.gender?.toLowerCase() ?? null,
      phone: user.userProfile?.phone ?? null,
      role: user.role.toLowerCase(),
      status: user.isEmailVerified ? 'active' : 'inactive',
      registeredAt: this.toDateOnly(user.createdAt),
      isEmailVerified: user.isEmailVerified,
      isProfileComplete: user.isProfileComplete,
      isFirstLogin: user.isFirstLogin,
      profile: user.userProfile,
      psychologistProfile: user.psychologistProfile,

      totalBookings: bookings.length,
      completedBookings,
      totalTransactions: transactionHistory.length,
      totalSpent,
      cancelledTransactionAmount,

      lastBooking: bookings[0] ? this.toDateOnly(bookings[0].createdAt) : null,

      bookingHistory: bookings.map((booking: any) => ({
        id: booking.id,
        service: booking.service?.nama || 'Layanan',
        psychologist: booking.psychologist?.fullName || '-',
        date: this.toDateOnly(booking.scheduledDate),
        time: booking.scheduledTime || '-',
        status: this.mapBookingStatus(booking.status),
        rawStatus: booking.status,
        price: booking.totalPrice || 0,
        bookingCode: booking.bookingCode,
      })),

      transactionHistory,
    };
  }

  async update(id: string, dto: UpdateAdminUserDto) {
  await this.findOne(id);

  const data: any = {};

  // 🟢 MAPPING ROLE: Jika frontend kirim PATIENT, ubah jadi USER
  if (dto.role) {
    if ((dto.role as string) === 'PATIENT') {
      data.role = 'USER';
    } else {
      data.role = dto.role;
    }
  }

  if (dto.status) {
    data.isEmailVerified = dto.status === 'active';
  }

  const user = await this.prisma.user.update({
    where: { id },
    data,
    include: {
      userProfile: true,
      psychologistProfile: true,
    },
  });

  return {
    message: 'User berhasil diupdate',
    data: {
      id: user.id,
      name:
        user.userProfile?.fullName ||
        user.psychologistProfile?.fullName ||
        '-',
      email: user.email,
      gender: user.userProfile?.gender?.toLowerCase() ?? null,
      phone: user.userProfile?.phone ?? null,
      role: user.role.toLowerCase(),
      status: user.isEmailVerified ? 'active' : 'inactive',
      registeredAt: this.toDateOnly(user.createdAt),
      isEmailVerified: user.isEmailVerified,
      isProfileComplete: user.isProfileComplete,
    },
  };
}

  async remove(id: string) {
    await this.findOne(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        isEmailVerified: false,
      },
      include: {
        userProfile: true,
        psychologistProfile: true,
      },
    });

    return {
      message: 'User berhasil dinonaktifkan',
      data: {
        id: user.id,
        name:
          user.userProfile?.fullName ||
          user.psychologistProfile?.fullName ||
          '-',
        email: user.email,
        role: user.role.toLowerCase(),
        status: 'inactive',
      },
    };
  }
}