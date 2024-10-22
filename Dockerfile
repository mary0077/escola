FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "start"]
