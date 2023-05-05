FROM public.ecr.aws/bitnami/node:14-prod-debian-10

ENV REACT_APP_SERVER=https://chatty-server.fly.dev:8000

EXPOSE 443

WORKDIR /usr/src/app


COPY package*.json .
RUN npm install --production
RUN npm run build
COPY build .


CMD [ "sh", "-c", "node index.js" ]

