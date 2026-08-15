FROM node:20

WORKDIR /app 

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
EXPOSE 3001
EXPOSE 3002

CMD ["node", "-e", "const fs=require('fs'); const target=fs.existsSync('./dist/main.js')?'./dist/main.js':fs.existsSync('./dist/src/main.js')?'./dist/src/main.js':'./dist/index.js'; console.log('Starting NestJS via:', target); require(target);"]