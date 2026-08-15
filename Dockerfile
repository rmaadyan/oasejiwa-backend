FROM node:20

RUN npm install -g pnpm

WORKDIR /app 

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002

CMD ["sh", "-c", "if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]