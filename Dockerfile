FROM public.ecr.aws/bitnami/node:14-prod-debian-10

ENV PORT=8000
ENV REACT_APP_SERVER=https://chatty-frontend.fly.dev:8000
ENV OPENAI_API_KEY=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
ENV NODE_ENV=production

EXPOSE 8000
EXPOSE 443

WORKDIR /usr/src/app

COPY server/package*.json server/
RUN cd server && npm install --production
COPY server/ server/

COPY client/package*.json client/
RUN cd client && npm install --production
COPY client/ client/


CMD [ "sh", "-c", "npm start" ]

