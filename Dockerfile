FROM node:latest
WORKDIR /usr/src
COPY package*.json ./ 
RUN npm install 
COPY . .
EXPOSE 5000
CMD ["npm", "start"]