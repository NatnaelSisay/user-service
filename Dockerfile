FROM node:20

WORKDIR /usr/home/src
COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
