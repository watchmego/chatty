# Stage 1
FROM node:8 as reactbuild
WORKDIR /usr/src/app
COPY . .
RUN npm install --production
RUN npm run build

# Stage 2
FROM nginx:alpine

ENV REACT_APP_SERVER=https://chatty-server.fly.dev:8080

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=reactbuild /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

