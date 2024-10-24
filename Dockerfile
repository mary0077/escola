FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL=""
ENV PORT=3000
ENV JWT_SECRET=""

EXPOSE ${PORT}

CMD ["node", "app.js"]