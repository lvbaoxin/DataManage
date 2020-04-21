FROM 221.180.255.16:8771/app/nginx:latest

MAINTAINER andylhz@outlook.com

RUN mkdir -p /app_web/webroot/ && rm -f /etc/nginx/conf.d/default.conf && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR  /app_web
COPY app_web.conf  /etc/nginx/conf.d/
COPY dist/   /app_web/webroot/

EXPOSE 80