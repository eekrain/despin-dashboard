FROM node:14.16.0-stretch-slim
WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY . .
RUN yarn build

FROM nginx
COPY ./nginx/default.dev.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /app/build /usr/share/nginx/html
COPY --from=0 /app/build /etc/nginx/html