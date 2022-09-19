FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm mongodb-init
EXPOSE 3000
CMD ["npm", "start"]