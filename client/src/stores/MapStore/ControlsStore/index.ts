import { makeObservable, observable } from 'mobx';

type Controls = 'search';

export default class ControlsStore {
  selected: Controls;

  resetData(): void {
    this.selected = null;
  }

  constructor() {
    this.selected = null;

    makeObservable(this, {
      selected: observable,
    });
  }
}
