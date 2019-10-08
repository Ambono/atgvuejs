FROM node:10-alpine  as build-stage
RUN apk add --no-cache bash
RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev make g++ libjpeg-turbo-dev 
RUN ["mkdir", "/install"]
COPY package*.json /install/
WORKDIR /install
Run npm rebuild
Run rm -rf node_modules/
RUN npm install 
RUN npm install --global cross-env
RUN npm install --global gulp 
RUN npm update -g npm 
RUN npm install gulp 
Run npm install jpegtran-bin
Run npm install optipng-bin
Run npm link jpegtran-bin
ENV NODE_PATH=/install/node_modules

COPY . /install/
#run ls /install/

RUN npm run prod --verbose
ENV NODE_PATH=/install/int-dist

#run ls /install
#run ls /install/int-dist
Run ls /install/int-dist/assets

FROM nginx:alpine as build
RUN apk add --no-cache bash
#Run rm -rf /var/cache/nginx/*
COPY --from=0 /install/int-dist/ /usr/share/nginx/html
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



