FROM node:20-alpine

WORKDIR /_projects/ReactGpt

COPY package*.json ./

RUN yarn add -g tsx typescript

RUN yarn

# COPY . .

# RUN chmod +x ./scripts/launch.sh


CMD ["tail", "-f", "/dev/null", "sh", "-c"]
