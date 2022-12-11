# 前端容器
FROM nginx:latest as BOOKS_BUILD

COPY ./books/dist /etc/nginx/html/books
COPY ./books/nginx.conf /etc/nginx/nginx.conf
COPY ./books/mime.types /etc/nginx/mime.types


# 后端容器
FROM alpine:3.17 as SERVER_BUILD

WORKDIR /usr/books/server
COPY ./server/node_modules ./node_modules
COPY ./server/dist ./dist


# 运行容器
FROM node:19.2-alpine as RUNNER

LABEL author.name="DingDangDog"
LABEL author.email="dddogx@qq.com"
LABEL project.name="cashbook"
LABEL project.version="0.0.1"
LABEL project.github="https://github.com/DingDangDog/cashbook"

# 前端
RUN apk add --no-cache nginx

COPY --from=BOOKS_BUILD /etc/nginx/html/books /var/lib/nginx/html/books
COPY --from=BOOKS_BUILD /etc/nginx/nginx.conf /var/lib/nginx/nginx.conf
COPY --from=BOOKS_BUILD /etc/nginx/mime.types /var/lib/nginx/mime.types

# 后端
WORKDIR /usr/cashbook/server

COPY --from=SERVER_BUILD /usr/books/server/node_modules ./node_modules
COPY --from=SERVER_BUILD /usr/books/server/dist ./dist

ENV NODE_OPTIONS=--max_old_space_size=2048
ENV CASHBOOK_VERSION "0.0.1"
ENV CASHBOOK_MONGODB_URL "mongodb://localhost:27017/cashbook?authSource=admin"

COPY ./entrypoint.sh ../

EXPOSE 80
ENTRYPOINT [ "sh","../entrypoint.sh" ]
