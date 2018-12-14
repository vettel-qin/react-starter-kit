#!/bin/bash
yarn build:uat
scp -r ./build/* root@192.168.103.107:/home/nginx/website/web/testtt

