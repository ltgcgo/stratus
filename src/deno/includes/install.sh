#!/bin/ash
wget -O /root/deno.zip https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip
unzip deno.zip
mv -v deno /bin/
rm -v deno.zip
exit