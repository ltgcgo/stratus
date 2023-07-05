#FROM docker.io/alpine:latest
FROM docker.io/frolvlad/alpine-glibc:latest

WORKDIR /root

COPY ./install.sh /root/
COPY ./index.js /root/
RUN sh /root/install.sh

EXPOSE 8000
CMD ["deno", "run", "--allow-read", "--allow-write", "--allow-net", "--unstable", "index.js"]
#CMD ["sleep", "infinite"]