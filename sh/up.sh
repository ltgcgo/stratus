#!/bin/bash
SERVICE=stratus
shx build
if [ -d "./dist/${1}/" ] ; then
	cd ./dist/${1}
	podman stop ${1}_${SERVICE}_1
	podman container rm ${1}_${SERVICE}_1
	podman rmi ${1}_${SERVICE}
	podman-compose up -d
else
	echo "Image \"${1}\" not found."
fi
exit