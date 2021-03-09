import { makeObservable, observable } from 'mobx';
import { MutableRefObject } from 'react';
import { BaseStore } from 'src/stores';
import { ButtonTypes } from 'src/components/Page/Aside/Button';

export type Controls = 'search' | 'comments';

export default class ControlsStore implements BaseStore {
  ref: MutableRefObject<HTMLDivElement>;

  selected: Controls;

  resetData(): void {
    this.ref = null;
    this.selected = null;
  }

  getStateFor(value: Controls): ButtonTypes {
    return this.selected === value ? 'close' : value;
  }

  toggle(value: Controls): void {
    if (!this.selected) {
      this.selected = value;
      return;
    }

    this.selected = null;
  }

  constructor() {
    this.ref = null;
    this.selected = null;

    makeObservable(this, {
      ref: observable,
      selected: observable,
    });
  }
}

export const controlsStore = new ControlsStore();
