FROM node:16.18.0
WORKDIR /front
COPY ./package*.json /front
COPY / /front
RUN npm install
RUN npm install -g serve@14.2.0
EXPOSE 3000
RUN npm run build
CMD ["npx", "serve", "-s", "build"]
