FROM node:18

LABEL author.name="DingDangDog"
LABEL author.email="dddogx@qq.com"
LABEL project.name="cashbook-server"
LABEL project.version=${CASHBOOK_VERSION}
LABEL project.description="this project is cashbook's server"

ENV NODE_OPTIONS=--max_old_space_size=4096

ENV CASHBOOK_VERSION "0.0.1"
ENV CASHBOOK_MONGODB_URL "mongodb://172.25.208.1:27017/cashbook?authSource=admin"

WORKDIR /usr/books/server
COPY ./node_modules ./node_modules
COPY ./dist ./dist
EXPOSE 3000
CMD [ "node", "./dist/main.js" ]
