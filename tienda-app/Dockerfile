FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install react-responsive-carousel --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm" , "start"] 
