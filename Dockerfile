FROM node:20

RUN npm install -g pnpm

WORKDIR /app 

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3001

CMD ["sh", "-c", "node dist/main.js || node dist/src/main.js"]