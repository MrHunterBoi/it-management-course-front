FROM node:20-alpine

WORKDIR /app

COPY package*.json . 

RUN npm install

COPY . .

COPY .env.local /app/.env.local

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000" ]
