FROM node:20-alpine

WORKDIR /_projects/ReactGpt

COPY package*.json ./

RUN npm i -g tsx yarn typescript 

RUN npm install

COPY . .

CMD ["tail", "-f", "/dev/null"]