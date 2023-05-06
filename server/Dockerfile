FROM public.ecr.aws/bitnami/node:14-prod-debian-10

RUN --mount=type=secret,id=OPENAI_API_KEY \ 
        cat /run/secrets/OPENAI_API_KEY
        
ENV PORT=8080
EXPOSE 8080

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .


CMD [ "node", "index.js" ]
