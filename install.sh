#!/usr/bin/bash
apt update
apt upgrade -y
apt install pigpio
apt install node
npm install
npm run build

