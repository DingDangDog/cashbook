FROM nginx:latest as BUILD_IMAGE

LABEL author.name="DingDangDog"
LABEL author.email="dddogx@qq.com"
LABEL project.name="cashbook-books"
LABEL project.version="0.0.1"
LABEL project.description="this project is ddd-cashbook's pages"

ENV NODE_OPTIONS=--max_old_space_size=1024
COPY ./dist /etc/nginx/html/books

VOLUME E:/docker-nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80