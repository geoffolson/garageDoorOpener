# garageDoorOpener

Raspberry Pi service for activating a garage door remotely

## Install

Service will require root privileges for accessing GPIO pins.

```
sudo bash install.sh
```

## Local Development

Use node version 18 for development and run the following to install

```
npm install
```

then run the dev api server with

```
npm run dev -w api
```

and in another console run the dev server for the frontend with

```
npm run dev -w web-ui
```

## Run

Service will run on port 80 by default after installation
