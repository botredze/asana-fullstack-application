# Stage 1: Build the Vue.js application
FROM node:latest as build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:stable

EXPOSE 80
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
