#!/usr/bin/bash
apt update
apt upgrade -y
apt install pigpio
node -v
if [ $? -eq 0 ]; then
    echo "node is already installed";
else
    echo "installing node";
    apt install nodejs
fi
npm -v
if [ $? -eq 0 ]; then
    echo "npm is already installed";
else
    echo "installing npm";
    apt install npm
fi
npm update
npm install
npm run build

