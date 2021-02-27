import { makeAutoObservable } from 'mobx';

export class AsyncData<T> {
  isFetching: boolean;
  isDataLoaded: boolean;
  error: string;
  data: T;

  constructor() {
    this.isFetching = false;
    this.isDataLoaded = false;
    this.error = null;
    this.data = null;

    makeAutoObservable(this);
  }
}
