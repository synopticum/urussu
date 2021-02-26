import { makeObservable, computed, observable } from 'mobx';

class Timer {
  secondsPassed = 0;

  constructor() {
    makeObservable(this, {
      secondsPassed: observable,
      secondPassedComputed: computed,
    });
  }

  get secondPassedComputed(): string {
    return 'X'.repeat(this.secondsPassed);
  }

  increaseTimer(): void {
    this.secondsPassed += 1;
  }
}

export default Timer;
