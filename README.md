# 🌊 Oase Jiwa - Backend API

Repository ini merupakan backend untuk project **Oase Jiwa** (Landing Page Biro Psikologi) dan modul riset **AI-Generated Image Detection**. Dibangun menggunakan **NestJS**, **Prisma**, dan **PostgreSQL**.

---

## 🛠️ Tech Stack & Infrastructure

* **Framework:** NestJS (Node.js)
* **Database:** PostgreSQL (v15) via Docker
* **ORM:** Prisma
* **Infrastructure Management:** Docker Compose & Portainer
* **Package Manager:** pnpm

---

## 📂 Project Structure

Project ini menggunakan **Modular Architecture** agar skalabel untuk kebutuhan riset dan aplikasi web:

```text
src/
├── common/           # Decorators, Filters, Guards, Interceptors, Pipes
├── config/           # Environment and Global Configurations
├── modules/          # Business Logic (Auth, Users, Image Detection)
├── prisma/           # Prisma Service & Schema
├── app.module.ts     # Root Module
└── main.ts           # Entry Point
🚀 Persiapan Pengembangan (Untuk Tim)
Rekan tim tidak perlu mengelola Docker secara langsung. Ikuti langkah berikut:

1. Instalasi Dependensi
Pastikan sudah menginstall pnpm, lalu jalankan:

Bash
pnpm install
# 🌊 Oase Jiwa - Backend API

Backend API untuk project Oase Jiwa, dibangun dengan NestJS + Prisma + PostgreSQL.

## Setup cepat

1. Install dependency:

```bash
pnpm install
```

2. Jalankan database:

```bash
docker compose up -d
```

3. Siapkan environment:

```bash
cp .env.example .env
```

4. Generate Prisma Client:

```bash
pnpm prisma:generate
```

5. Jalankan migrasi database (development):

```bash
pnpm prisma:migrate:dev --name init
```

6. Jalankan backend:

```bash
pnpm start:dev
```

## Perintah Prisma

- Generate client: `pnpm prisma:generate`
- Buat + terapkan migrasi lokal: `pnpm prisma:migrate:dev --name <nama_migrasi>`
- Terapkan migrasi di server/deploy: `pnpm prisma:migrate:deploy`
- Buka Prisma Studio: `pnpm prisma:studio`

## Sambungkan ke frontend

Backend sudah mengaktifkan CORS dan membaca `CORS_ORIGIN` dari `.env`.

Contoh:

```env
CORS_ORIGIN="http://localhost:5173"
```

Jika frontend lebih dari satu origin:

```env
CORS_ORIGIN="http://localhost:5173,http://localhost:3001"
```

Setelah backend jalan di port default 3000, frontend dapat memanggil API ke:

`http://localhost:3000`

## Catatan Docker permission (Linux)

Jika muncul error `permission denied /var/run/docker.sock`, jalankan:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Lalu ulangi `docker compose up -d`.
