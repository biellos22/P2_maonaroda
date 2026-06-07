FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Expõe a porta do Next.js
EXPOSE 3000

CMD ["npm", "run", "dev"]