FROM node
WORKDIR /app
COPY package*.json ./
RUN apt-get update
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start
