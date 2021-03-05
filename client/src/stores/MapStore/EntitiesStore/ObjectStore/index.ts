import { computed, makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped, map } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { ImageMapped, ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import { EntityId } from 'src/contracts/entities';

export default class ObjectStore {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectMapped>();

  fetchApiData(id: EntityId): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<ObjectDto, ObjectMapped>(`/objects/${id}`, options);
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped>();
    this.selectedImage = null;
    this.selectedDecade = null;
  }

  private getMaxDecadeWithImage(images: ImagesMapped): number {
    return Math.max(...Object.keys(images).map(decade => parseInt(decade)));
  }

  get initialDecade(): number {
    const { data } = this.apiData;

    if (!data || !data.images) {
      return null;
    }

    return this.getMaxDecadeWithImage(data.images);
  }

  get initialImage(): ImageMapped {
    const { data } = this.apiData;

    if (!data || !data.images) {
      return null;
    }

    const decade = this.getMaxDecadeWithImage(data.images);

    return data.images[decade][0];
  }

  selectedImage: ImageMapped;
  selectedDecade: number;

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
      selectedImage: observable,
      selectedDecade: observable,
      initialImage: computed,
      initialDecade: computed,
    });
  }
}
