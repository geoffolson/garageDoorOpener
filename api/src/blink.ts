import { Gpio } from "pigpio";

const outPin = 9;

const gpio = new Gpio(outPin, { mode: Gpio.OUTPUT });

const pinState = (() => {
  let state = 0;
  return {
    toggle() {
      if (state === 0) state = 1;
      else state = 0;
      return state;
    },
  };
})();

setInterval(() => {
  const state = pinState.toggle();
  gpio.digitalWrite(state);
}, 1000);
