import { computed, makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntitiesStore/DotStore';
import { ImageMapped, ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import PathStore from 'src/stores/MapStore/EntitiesStore/PathStore';
import { BaseStore } from 'src/stores';

export const getImage = (params: URLSearchParams): ImageMapped => {
  const [year, url] = params.get('image').split(',');

  return { year, url };
};

export default class ImagesStore implements BaseStore {
  store: ObjectStore | DotStore | PathStore;

  selectedImage: ImageMapped;

  selectedDecade: number;

  resetData(): void {
    this.store = null;
    this.selectedImage = null;
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

  changeSelectedImage(image: ImageMapped): void {
    this.selectedImage = image;
  }

  isImageActive = (image: ImageMapped): boolean => {
    const { year, url } = this.selectedImage;
    return image.year === year && image.url === url;
  };

  get initialImage(): ImageMapped {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    const decade = this.getMaxDecadeWithImage(data.images);

    return data.images[decade][0];
  }

  constructor() {
    this.store = null;

    if (location.search) {
      const params = new URLSearchParams(location.search);

      if (params.has('image')) {
        const image = getImage(params);
        this.selectedImage = image;
        this.selectedDecade = parseInt(`${image.year.substring(0, 3)}0`);
      }
    }

    makeObservable(this, {
      store: observable,
      selectedImage: observable,
      selectedDecade: observable,
      initialImage: computed,
      initialDecade: computed,
    });
  }
}

export const imagesStore = new ImagesStore();
