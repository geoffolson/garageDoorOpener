import { Gpio } from "pigpio";
import { config } from "./loadConfig";

type Relay = { digitalWrite: (state: PinState) => void };

const relay: Relay = (() => {
  try {
    const gpio = new Gpio(config.outPin, { mode: Gpio.OUTPUT });
    console.log(`GPIO pin ${config.outPin} set`);
    return gpio;
  } catch (e) {
    console.log(e);
    // fallback to mock relay pin for local testing/development
    return {
      digitalWrite(state: PinState) {
        console.log(state);
      },
    };
  }
})();

const enum PinState {
  Off,
  On,
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Pin {
  private pinState: PinState;
  private relay;
  constructor(relay: Relay) {
    this.pinState = PinState.Off;
    this.relay = relay;
    relay.digitalWrite(PinState.Off);
  }

  write(state: PinState) {
    this.pinState = state;
    this.relay.digitalWrite(state);
  }

  async press() {
    if (this.pinState === PinState.On) return;
    this.write(PinState.On);
    await delay(500);
    this.write(PinState.Off);
  }
}

export const pin = new Pin(relay);
