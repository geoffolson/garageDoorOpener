const enum PinState {
  Off,
  On,
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Pin {
  private pinState: PinState;
  constructor() {
    this.pinState = PinState.Off;
  }

  write(state: PinState) {
    this.pinState = state;
    console.log(this.pinState);
  }

  async press() {
    if (this.pinState === PinState.On) return;
    this.write(PinState.On);
    await delay(2000);
    this.write(PinState.Off);
  }
}

export const pin = new Pin();
