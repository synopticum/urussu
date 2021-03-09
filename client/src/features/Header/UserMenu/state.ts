import { makeAutoObservable, makeObservable, observable } from 'mobx';

class State {
  isOpen: boolean;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  close(): void {
    this.isOpen = false;
  }

  constructor() {
    this.isOpen = false;

    makeObservable(this, {
      isOpen: observable,
    });
  }
}

const state = new State();

export default state;
