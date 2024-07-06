#!/usr/bin/bash

# install system dependencies
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

# install and build
npm update
npm install
npm run build

# create and enable service
cp garage-door.servive /lib/systemd/system/
systemctl daemon-reload
systemctl start gatage-door.service
systemctl enable garage-door.service

