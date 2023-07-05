#!/bin/bash
SERVICE=stratus
if [ -d "./dist/${1}/" ] ; then
	cd ./dist/${1}
	podman build -t ${SERVICE}_${1}_latest .
	podman push ${SERVICE}_${1}_latest docker://docker.io/${DH_USER:-ltgc}/${SERVICE}:${1}
	podman rmi ${SERVICE}_${1}_latest
else
	echo "Image \"${1}\" not found."
fi
exit