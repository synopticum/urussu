import { makeAutoObservable } from 'mobx';

export class AsyncData {
  isFetching: boolean;
  isDataLoaded: boolean;
  error: string;
  data: unknown;

  constructor() {
    this.isFetching = false;
    this.isDataLoaded = false;
    this.error = null;
    this.data = null;

    makeAutoObservable(this);
  }
}
