FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

RUN npx prisma migrate deploy

ENV DATABASE_URL="postgresql://escola_owner:n1LdSbBkUI7V@ep-divine-bonus-a537hq4o.us-east-2.aws.neon.tech/escola?sslmode=require"
ENV PORT=3000
ENV JWT_SECRET="umsegredoae"

EXPOSE $PORT

CMD ["npm", "start"]


