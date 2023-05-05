FROM public.ecr.aws/bitnami/node:14-prod-debian-10

ENV REACT_APP_SERVER=https://chatty-server.fly.dev:8080

EXPOSE 443

WORKDIR /usr/src/app


COPY package*.json .
RUN npm install --production
COPY . .
RUN npm run build


CMD [ "sh", "-c", "npx serve build" ]

