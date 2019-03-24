FROM node:10-alpine as build_stage

RUN mkdir /app/
WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY . /app/

RUN yarn build

FROM nginx:1.15.2-alpine

COPY --from=build_stage /app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build_stage /app/build /var/www

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
