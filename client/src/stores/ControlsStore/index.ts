import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { MutableRefObject } from 'react';
import { api } from 'src/stores';

type Controls = 'search' | 'comments';

export default class ControlsStore {
  private api: AxiosInstance;

  ref: MutableRefObject<HTMLDivElement>;

  selected: Controls;

  resetData(): void {
    // this.ref = null;
    this.selected = null;
    // this.resetSearchData();
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
