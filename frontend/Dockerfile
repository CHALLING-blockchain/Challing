FROM node:16.17.0-alpine as build-stage
WORKDIR /workdir/
COPY package*.json ./
RUN npm install
COPY . .
ARG runscript=build
RUN npm run ${runscript}

FROM nginx:stable-alpine
COPY --from=build-stage /workdir/default.conf /etc/nginx/conf.d/
COPY --from=build-stage /workdir/build/ /usr/share/nginx/html/
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
