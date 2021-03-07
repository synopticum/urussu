import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { SearchResultMapped, map } from 'src/stores/ControlsStore/map';
import { SearchResultDto } from 'src/contracts/search';
import { MutableRefObject } from 'react';

type Controls = 'search' | 'comments';

export default class ControlsStore {
  private api: AxiosInstance;

  ref: MutableRefObject<HTMLDivElement>;

  searchData = new AsyncData<SearchResultMapped>();

  selected: Controls;

  resetData(): void {
    // this.ref = null;
    this.selected = null;
    this.resetSearchData();
  }

  resetSearchData(): void {
    this.searchData = new AsyncData<SearchResultMapped>();
  }

  search(value: string): void {
    const { api, searchData } = this;
    const options = { api, apiData: searchData, map };

    fetchData<SearchResultDto, SearchResultMapped>(`/search?value=${value}`, options);
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
