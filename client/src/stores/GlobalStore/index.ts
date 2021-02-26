import React from 'react';
import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';

export default class Index {
  private api: AxiosInstance;

  language = process.env.DEFAULT_LANGUAGE;
  title = 'some title';
  apiData = new AsyncData();

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.title = e.target.value;
  };

  fetchData = async (): Promise<void> => {
    const { apiData } = this;
    apiData.isFetching = true;

    try {
      await this.api.get('/test');

      apiData.error = null;
      apiData.data = 'Data returned asynchronously: ' + new Date().toISOString();
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
