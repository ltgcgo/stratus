#!/bin/ash
cpuArch=$(uname -m)
transArch=
case $cpuArch in
	"x86_64" | "amd64")
		transArch=x64
		;;
	"arm64" | "armv8l" | "aarch64")
		transArch="aarch64"
		;;
esac
wget -O bun.zip https://github.com/oven-sh/bun/releases/latest/download/bun-linux-${transArch}.zip
unzip bun.zip
mv -v bun-linux-*/bun /bin/
rm -rfv bun-linux-*
rm -v bun.zip
exit