import React, { MutableRefObject } from 'react';
import { makeObservable, observable } from 'mobx';
import { BaseStore } from 'src/stores';

type Screen = 'index' | 'info' | 'map';

export default class GlobalStore implements BaseStore {
  language: string;
  title: string;
  titleRef: MutableRefObject<HTMLDivElement>;
  currentScreen: Screen = 'index';

  static SCREEN_MULTIPLIER = {
    index: 0,
    info: 1,
    map: 2,
  };

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.title = e.target.value;
  };

  setCurrentScreen(screen: Screen): void {
    this.currentScreen = screen;

    window.scrollTo({
      top: window.innerHeight * GlobalStore.SCREEN_MULTIPLIER[screen],
      left: 0,
      behavior: 'smooth',
    });
  }

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
      currentScreen: observable,
    });
  }
}

export const globalStore = new GlobalStore();
