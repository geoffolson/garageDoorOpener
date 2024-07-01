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

export const doorSwitch = new MockDoorSwitch();
