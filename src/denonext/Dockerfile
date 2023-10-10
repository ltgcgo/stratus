#FROM docker.io/alpine:latest
FROM docker.io/frolvlad/alpine-glibc:latest

WORKDIR /root

COPY ./includes /root/
RUN sh /root/install.sh

EXPOSE 8000
CMD ["sh", "run.sh"]
#CMD ["deno", "run", "--allow-read", "--allow-write", "--allow-net", "--unstable", "index.js"]
#CMD ["sleep", "infinite"]