FROM node:20

RUN npm install -g pnpm

WORKDIR /app 

COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Tambahkan flag shamefully-hoist agar express terbaca
RUN pnpm install --shamefully-hoist

COPY . .

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3001

CMD ["node", "dist/main.js"]