FROM node:latest

#RUN apt-get update -qq && apt-get install -y build-essential nano par2

ENV APP_HOME=/root/vue-spa

ENV SHELL=/bin/bash

RUN if [ ! -d "$APP_HOME" ]; then mkdir $APP_HOME; fi
WORKDIR $APP_HOME


# Install app dependencies
COPY vue-spa/package.json /root/vue-spa/
RUN npm install
#RUN npm install --quiet --global vue-cli

#Subsequent steps should run uncached each time
ARG CACHE_DATE=2017-03-08

