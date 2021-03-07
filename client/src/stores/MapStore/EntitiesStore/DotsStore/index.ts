import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/entities/dot';
import { map } from 'src/stores/MapStore/EntitiesStore/DotsStore/map';
import { DotMapped } from 'src/stores/MapStore/EntitiesStore/DotStore/map';
import { api } from 'src/stores';

export default class DotsStore {
  private api: AxiosInstance;

  apiData = new AsyncData<DotMapped[]>();

  fetchApiData(): void {
    const { apiData } = this;
    const options = { apiData, map };

    fetchData<DotDto[], DotMapped[]>('/dots', options);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}

export const dotsStore = new DotsStore(api);
