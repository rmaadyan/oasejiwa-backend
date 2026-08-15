FROM node:20

RUN npm install -g pnpm

WORKDIR /app 

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3001

CMD ["node", "-e", "const fs=require('fs'); const main = fs.existsSync('./dist/main.js') ? './dist/main.js' : './dist/src/main.js'; require(main);"]