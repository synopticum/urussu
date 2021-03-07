import { computed, makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntitiesStore/DotStore';
import { ImageMapped, ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import PathStore from 'src/stores/MapStore/EntitiesStore/PathStore';

export default class ImagesStore {
  store: ObjectStore | DotStore | PathStore;

  selectedImage: ImageMapped;

  selectedDecade: number;

  resetData(): void {
    this.store = null;
    this.selectedImage = null;
    this.selectedDecade = null;
  }

  private getMaxDecadeWithImage(images: ImagesMapped): number {
    return Math.max(...Object.keys(images).map(decade => parseInt(decade)));
  }

  get initialDecade(): number {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    return this.getMaxDecadeWithImage(data.images);
  }

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
    this.selectedImage = null;
    this.selectedDecade = null;

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
