import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { MutableRefObject } from 'react';
import { api, BaseStore } from 'src/stores';
import { ButtonTypes } from 'src/components/Page/Aside/Button';

export type Controls = 'search' | 'comments';

export default class ControlsStore implements BaseStore {
  private api: AxiosInstance;

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

  constructor(api: AxiosInstance) {
    this.api = api;
    this.ref = null;
    this.selected = null;

    makeObservable(this, {
      ref: observable,
      selected: observable,
    });
  }
}

export const controlsStore = new ControlsStore(api);
