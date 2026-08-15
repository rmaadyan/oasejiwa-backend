FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 3001

# Jalankan langsung file TypeScript utama via npx tsx
CMD ["npx", "tsx", "src/main.ts"]