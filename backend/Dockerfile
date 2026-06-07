# Usar uma imagem oficial do Node.js
FROM node:20-alpine

# Criar a pasta de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos de dependência
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o resto do código
COPY . .

# A porta não expomos aqui porque faremos isso no docker-compose