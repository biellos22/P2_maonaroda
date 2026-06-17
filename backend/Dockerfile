FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["sh", "-c", "node ${START_FILE:-server-users.js}"]