FROM public.ecr.aws/bitnami/node:14-prod-debian-10

ENV PORT=8000
EXPOSE 8000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm run build
COPY build/ .


CMD [ "node", "index.js" ]
