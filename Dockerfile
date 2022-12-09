FROM node:18 as BUILD_IMAGE

LABEL author.name="DingDangDog"
LABEL author.email="dddogx@qq.com"
LABEL project.name="cashbook-server"
LABEL project.version="0.0.1"
LABEL project.description="this project is ddd-cashbook's server"

ENV NODE_OPTIONS=--max_old_space_size=4096
WORKDIR /app/server
RUN yarn config set registry https://registry.npm.taobao.org
COPY . .
RUN yarn
RUN yarn build

FROM node:18
WORKDIR /usr/books/server
COPY ./node_modules ./node_modules
COPY ./dist ./dist
EXPOSE 3000
CMD [ "node", "main.js" ]
