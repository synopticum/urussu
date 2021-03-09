import { computed, makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntitiesStore/DotStore';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import PathStore from 'src/stores/MapStore/EntitiesStore/PathStore';
import { BaseStore } from 'src/stores';
import { ImageId } from 'src/contracts/entities';

export const getImageId = (params: URLSearchParams): ImageId => params.get('image');

export const getImageDecade = (id: ImageId): number => {
  return parseInt(`${id.split(',')[0].substring(0, 3)}0`);
};

export default class ImagesStore implements BaseStore {
  store: ObjectStore | DotStore | PathStore;

  selectedImageId: ImageId;

  get selectedImageUrl(): string {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    const images = Object.values(data.images).flat();

    images.forEach(({ image: nestedImage }) => {
      if (nestedImage) {
        images.push(nestedImage);
      }
    });

    const image = images.find(image => image.id === this.selectedImageId);

    return `${process.env.S3_URL}/${image.url}`;
  }

  selectedDecade: number;

  resetData(): void {
    this.store = null;
    this.selectedImageId = null;
    this.selectedDecade = null;
  }

  createTimeline(images: ImagesMapped): ImagesMapped {
    const DECADES = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
    const timeline: ImagesMapped = {};
    const decades = Object.entries(images);

    DECADES.forEach(decade => (timeline[decade] = null));

    decades.forEach(([decade, images]) => {
      timeline[parseInt(decade)] = images;
    });

    return timeline;
  }

  get initialDecade(): number {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    return this.getMaxDecadeWithImage(data.images);
  }

  changeSelectedDecade(decade: string): void {
    this.selectedDecade = parseInt(decade);
  }

  isDecadeActive(decade: string): boolean {
    return this.selectedDecade === parseInt(decade);
  }

  private getMaxDecadeWithImage(images: ImagesMapped): number {
    return Math.max(...Object.keys(images).map(decade => parseInt(decade)));
  }

  changeSelectedImageId(id: ImageId): void {
    this.selectedImageId = id;
  }

  isImageActive = (id: ImageId): boolean => {
    return id === this.selectedImageId;
  };

  get initialImageId(): ImageId {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    const decade = this.getMaxDecadeWithImage(data.images);

    return data.images[decade][0].id;
  }

  constructor() {
    this.store = null;

    if (location.search) {
      const params = new URLSearchParams(location.search);

      if (params.has('image')) {
        const id = getImageId(params);
        this.selectedImageId = id;
        this.selectedDecade = getImageDecade(id);
      }
    }

    makeObservable(this, {
      store: observable,
      selectedImageId: observable,
      selectedDecade: observable,

      initialImageId: computed,
      initialDecade: computed,
      selectedImageUrl: computed,
    });
  }
}

export const imagesStore = new ImagesStore();
