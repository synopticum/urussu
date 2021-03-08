import React from 'react';
import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { api, BaseStore } from 'src/stores';

export default class GlobalStore implements BaseStore {
  private api: AxiosInstance;

  language: string;
  title: string;
  apiData = new AsyncData<string>();

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.title = e.target.value;
  };

  fetchData = async (): Promise<void> => {
    const { apiData } = this;
    apiData.isFetching = true;

    try {
      const { data } = await this.api.get<string>('/test');

      apiData.error = null;
      apiData.data = data;
      apiData.isFetching = false;
      apiData.isDataLoaded = true;
    } catch (e) {
      apiData.error = e.message;
      apiData.isFetching = false;
    }
  };

  resetData(): void {
    this.title = null;
    this.language = 'ru';
    this.apiData = new AsyncData<string>();
  }

  constructor(api: AxiosInstance) {
    this.api = api;
    this.title = 'some title';
    this.language = process.env.DEFAULT_LANGUAGE;

    makeObservable(this, {
      language: observable,
      title: observable,
      apiData: observable,
    });
  }
}

export const globalStore = new GlobalStore(api);
