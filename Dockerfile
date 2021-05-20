FROM node:14.3

WORKDIR /app

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apt-get update -y && \
  apt-get upgrade -y && \
  npm install -g npm && \
  npm install -g ejs &&\ 
  npm install -g nuxt &&\
  npm install -g core-js &&\
  npm install -g defu

RUN npm install -g @vue/cli

ADD . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
