import { Gpio } from "pigpio";
import { config } from "./loadConfig";
import { EventEmitter } from "events";

type DoorSwitch = { digitalRead: () => number } & EventEmitter;

class MockDoorSwitch extends EventEmitter {
  private switch = 0;
  constructor() {
    super();
    setInterval(() => {
      this.switch = this.switch === 0 ? 1 : 0;
      this.emit("alert", this.switch, 0);
    }, 5000);
  }

  digitalRead() {
    return this.switch;
  }
}

class DisabledDoorSwitch extends EventEmitter {
  digitalRead() {
    return 0;
  }
}

const doorSwitchPin: DoorSwitch | null = (() => {
  if (!config.doorSwitchEnabled || config.doorSwitchPin === undefined) {
    console.log("door switch disabled");
    return new DisabledDoorSwitch();
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
