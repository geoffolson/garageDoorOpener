import { Gpio } from "pigpio";
import { config } from "./loadConfig";
import { EventEmitter } from "events";

class MockDoorSwitch extends EventEmitter {
  private switch = 0;
  private interval;
  constructor() {
    super();
    this.interval = setInterval(() => {
      this.switch = this.switch === 0 ? 1 : 0;
      this.emit("alert", this.switch, 0);
    }, 5000);
  }
}

const doorSwitchPin: EventEmitter = (() => {
  if (!config.doorSwitchEnabled || config.doorSwitchPin === undefined){
    console.log("door switch disabled falling back to mock relay pin")
    return new MockDoorSwitch();
  }
  try {
    const gpio = new Gpio(config.doorSwitchPin, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      alert: true,
    });
    console.log(`GPIO pin ${config.doorSwitchPin} set to input`);
    return gpio;
  } catch (e) {
    console.log("falling back to mock relay pin", e);
    return new MockDoorSwitch();
  }
})();

export const doorSwitch = doorSwitchPin;
