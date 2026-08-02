import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

export interface GoogleReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  photoUrl?: string;
  relativeTime?: string;
  createdAt?: string;
}

export interface GoogleReviewsResponse {
  businessName: string;
  rating: number;
  totalReviews: number;
  googleMapsUrl: string;
  reviews: GoogleReviewItem[];
  lastSyncedAt: string;
  isFromCache: boolean;
  status: string;
}

// Fallback authentic reviews from Google Maps Oase Jiwa profile
const FALLBACK_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Dicky C. Anggoro',
    rating: 5,
    text: 'Great experience, konseling profesional dan tempatnya sangat mendukung untuk relaksasi.',
    photoUrl: undefined,
    relativeTime: '8 bulan lalu',
    createdAt: '2025-11-15T08:00:00Z',
  },
  {
    id: 'rev-2',
    author: 'Gilang Muhammad Faqih',
    rating: 5,
    text: 'Tempatnya enak santai, nyaman dan bersih. Pendampingannya pun enak dan asik. Sukses teruss 😁',
    photoUrl: undefined,
    relativeTime: '8 bulan lalu',
    createdAt: '2025-11-20T08:00:00Z',
  },
  {
    id: 'rev-3',
    author: 'Hana Bilqisty',
    rating: 5,
    text: 'Mashallah, very helpful, the location is also close to the UMM campus 🤩',
    photoUrl: undefined,
    relativeTime: '9 bulan lalu',
    createdAt: '2025-10-10T08:00:00Z',
  },
  {
    id: 'rev-4',
    author: 'ZuLvya R.',
    rating: 5,
    text: 'Konseling di sini nyaman banget. Psikolognya ramah dan komunikatif. Untuk biayanya juga masih tergolong aman, tidak menguras dompet.',
    photoUrl: undefined,
    relativeTime: '2 minggu lalu',
    createdAt: '2026-07-15T08:00:00Z',
  },
  {
    id: 'rev-5',
    author: 'Aditya P.',
    rating: 5,
    text: 'Tempatnya nyaman, sangat berkualitas untuk konsultasi terkait diri sendiri, dan ditangani oleh ahlinya.',
    photoUrl: undefined,
    relativeTime: '1 bulan lalu',
    createdAt: '2026-06-10T08:00:00Z',
  },
  {
    id: 'rev-6',
    author: 'Nur Avia A. J.',
    rating: 5,
    text: 'Nyaman dan helpful sekali. Bintang 5 untuk pelayanannya. Psikolognya juga sangat membantu.',
    photoUrl: undefined,
    relativeTime: '2 bulan lalu',
    createdAt: '2026-05-15T08:00:00Z',
  },
];

@Injectable()
export class GoogleReviewsService implements OnModuleInit {
  private readonly logger = new Logger(GoogleReviewsService.name);
  private cache: {
    data: GoogleReviewsResponse | null;
    lastFetchedAt: Date | null;
  } = { data: null, lastFetchedAt: null };

  private readonly CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 Hours Auto Sync

  onModuleInit() {
    // Initial fetch on module start
    this.getReviews().catch((err) =>
      this.logger.warn('Failed initial Google Reviews fetch:', err)
    );

    // Background Auto Sync Interval (every 6 hours)
    setInterval(() => {
      this.logger.log('Running automatic 6-hour Google Reviews background sync...');
      this.getReviews(true).catch((err) =>
        this.logger.warn('Failed background auto-sync:', err)
      );
    }, this.CACHE_TTL_MS);
  }

  async getReviews(forceSync = false): Promise<GoogleReviewsResponse> {
    const now = new Date();

    // Check in-memory cache validity (if not forced)
    if (
      !forceSync &&
      this.cache.data &&
      this.cache.lastFetchedAt &&
      now.getTime() - this.cache.lastFetchedAt.getTime() < this.CACHE_TTL_MS
    ) {
      return {
        ...this.cache.data,
        isFromCache: true,
      };
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (apiKey && placeId) {
      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&key=${apiKey}&language=id`;
        const res = await fetch(url);
        if (res.ok) {
          const json = (await res.json()) as any;
          if (json && json.status === 'OK' && json.result) {
            const result = json.result;
            const mappedReviews: GoogleReviewItem[] = (result.reviews || []).map(
              (r: any, idx: number) => ({
                id: `g-rev-${idx}`,
                author: r.author_name || 'Pengguna Google',
                rating: r.rating || 5,
                text: r.text || '',
                photoUrl: r.profile_photo_url || r.author_photo_url || undefined,
                relativeTime: r.relative_time_description || 'Baru saja',
                createdAt: r.time ? new Date(r.time * 1000).toISOString() : new Date().toISOString(),
              }),
            );

            // Official Google user_ratings_total (e.g. 35, 36, 41, 50 Reviews)
            const responseData: GoogleReviewsResponse = {
              businessName: result.name || 'Biro Psikologi Oase Jiwa',
              rating: typeof result.rating === 'number' ? result.rating : 5.0,
              totalReviews:
                typeof result.user_ratings_total === 'number'
                  ? result.user_ratings_total
                  : 35,
              googleMapsUrl: result.url || 'https://maps.google.com/?q=Biro+Psikologi+Oase+Jiwa',
              reviews: mappedReviews.length > 0 ? mappedReviews : FALLBACK_REVIEWS,
              lastSyncedAt: now.toISOString(),
              isFromCache: false,
              status: 'Terhubung langsung dengan Google Business Profile.',
            };

            this.cache = { data: responseData, lastFetchedAt: now };
            this.logger.log(`Berhasil sinkronisasi data Google Business Profile: ${responseData.totalReviews} Ulasan, Rating ${responseData.rating}`);
            return responseData;
          }
        }
      } catch (err) {
        this.logger.warn('Gagal fetch dari Google Places API, menggunakan data cache:', err);
      }
    }

    // Dynamic Fallback response matching Google Maps official total user_ratings_total (35 Ulasan)
    const fallbackCount = typeof this.cache.data?.totalReviews === 'number' ? this.cache.data.totalReviews : 35;
    const fallbackRating = typeof this.cache.data?.rating === 'number' ? this.cache.data.rating : 5.0;

    const fallbackResponse: GoogleReviewsResponse = {
      businessName: 'Biro Psikologi Oase Jiwa',
      rating: fallbackRating,
      totalReviews: fallbackCount,
      googleMapsUrl: 'https://maps.google.com/?q=Biro+Psikologi+Oase+Jiwa',
      reviews: this.cache.data?.reviews || FALLBACK_REVIEWS,
      lastSyncedAt: this.cache.lastFetchedAt ? this.cache.lastFetchedAt.toISOString() : now.toISOString(),
      isFromCache: true,
      status: 'Data ulasan menggunakan Cache / Fallback.',
    };

    this.cache = { data: fallbackResponse, lastFetchedAt: now };
    return fallbackResponse;
  }
}
