FROM csu-nexus.kbprasac.com.kh:5000/prasac-nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
