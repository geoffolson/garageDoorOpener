#!/usr/bin/bash
apt update
apt upgrade -y
apt install pigpio
node -v
if [ $? -eq 0 ]; then
    echo "node is already installed";
else
    echo "installing node";
    apt install node
fi
npm install
npm run build

