import React from 'react';
import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { api } from 'src/stores';

export default class GlobalStore {
  private api: AxiosInstance;

  language = process.env.DEFAULT_LANGUAGE;
  title = 'some title';
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

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      language: observable,
      title: observable,
      apiData: observable,
    });
  }
}

export const globalStore = new GlobalStore(api);
