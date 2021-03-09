import React from 'react';
import { makeObservable, observable } from 'mobx';
import { BaseStore } from 'src/stores';

export default class GlobalStore implements BaseStore {
  language: string;
  title: string;

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.title = e.target.value;
  };

  resetData(): void {
    this.title = null;
    this.language = 'ru';
  }

  constructor() {
    this.title = 'some title';
    this.language = process.env.DEFAULT_LANGUAGE;

    makeObservable(this, {
      language: observable,
      title: observable,
    });
  }
}

export const globalStore = new GlobalStore();
