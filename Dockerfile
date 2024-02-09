FROM node:20-alpine

WORKDIR /_projects/ReactGpt

COPY package*.json ./

RUN yarn add -g tsx typescript 

RUN yarn

COPY . .

CMD ["tail", "-f", "/dev/null"]