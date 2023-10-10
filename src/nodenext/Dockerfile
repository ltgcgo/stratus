FROM docker.io/alpine:latest
#FROM docker.io/frolvlad/alpine-glibc:latest

WORKDIR /root

COPY ./includes /root/
RUN sh /root/install.sh

EXPOSE 8000
CMD ["sh", "run.sh"]
#CMD ["node", "index.js"]
#CMD ["sleep", "infinite"]