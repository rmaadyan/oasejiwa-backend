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
2. Konfigurasi Environment
Salin file .env.example menjadi .env dan sesuaikan variabelnya:

Bash
cp .env.example .env
Note: Mintalah detail DATABASE_URL kepada Infrastructure Lead (Ravendette) jika ingin menyambung ke database Docker pusat.

3. Prisma Setup
Generate client Prisma agar TypeScript mengenali skema database:

Bash
npx prisma generate
🐳 Infrastructure (Khusus Admin/DevOps)
Bagian ini dikelola oleh Infrastructure Lead.

Menjalankan Database & Portainer
Bash
docker compose up -d
Monitoring via Portainer
Akses dashboard Portainer untuk memantau status container dan log database:

URL: https://localhost:9443

Database Port: 5432

📝 Workflow Git
Jangan push file .env.

Jika ada perubahan pada schema.prisma, segera kabari tim untuk melakukan npx prisma generate.

Pastikan kode sudah melewati linting sebelum push: pnpm run lint.
