import { makeObservable, observable } from 'mobx';

class State {
  isOpen = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
    });
  }
}

const state = new State();

export default state;
