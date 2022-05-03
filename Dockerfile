# FROM node:12.14.0
FROM node
WORKDIR /app
COPY package.json ./
RUN npm install
# RUN npm install -g @nestjs/cli@8.2.2
RUN npm install -g @nestjs/cli
COPY . .
EXPOSE 3000
