FROM node:16.18.0
WORKDIR /client
COPY ./package*.json /client
COPY / /client
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npx", "serve", "-s", "build"]
