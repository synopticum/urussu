import { computed, makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntityStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntityStore/DotStore';
import { ImageMapped, ImagesMapped } from 'src/stores/MapStore/EntityStore';
import PathStore from 'src/stores/MapStore/EntityStore/PathStore';
import { BaseStore } from 'src/stores';
import { ImageId } from 'src/contracts/entities';
import { controlsStore } from 'src/stores/ControlsStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';

export default class ImagesStore implements BaseStore {
  store: ObjectStore | DotStore | PathStore;
  selectedImageId: ImageId;
  selectedDecade: number;

  get selectedImageYear(): string {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    const image = this.findImage(data.images);

    return image.year;
  }

  get selectedImageUrl(): string {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    const image = this.findImage(data.images);

    return `${process.env.S3_URL}/${image.url}`;
  }

  get initialDecade(): number {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    return this.getMaxDecadeWithImage(data.images);
  }

  get initialImageId(): ImageId {
    const { data } = this.store.apiData;

    if (!data || !data.images) {
      return null;
    }

    const decade = this.getMaxDecadeWithImage(data.images);

    return data.images[decade][0].id;
  }

  private static DECADES = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  resetData(): void {
    this.store = null;
    this.selectedImageId = null;
    this.selectedDecade = null;
  }

  createTimeline(images: ImagesMapped): ImagesMapped {
    const timeline: ImagesMapped = {};
    const decades = Object.entries(images);

    ImagesStore.DECADES.forEach(decade => (timeline[decade] = null));

    decades.forEach(([decade, images]) => {
      timeline[parseInt(decade)] = images;
    });

    return timeline;
  }

  changeSelectedDecade(decade: string): void {
    this.selectedDecade = parseInt(decade);
  }

  isDecadeActive(decade: string): boolean {
    return this.selectedDecade === parseInt(decade);
  }

  changeSelectedImageId(id: ImageId): void {
    this.selectedImageId = id;
    controlsStore.toggle('comments');
    commentsStore.resetData();
  }

  isImageActive(id: ImageId): boolean {
    return id === this.selectedImageId;
  }

  private getMaxDecadeWithImage(images: ImagesMapped): number {
    return Math.max(...Object.keys(images).map(decade => parseInt(decade)));
  }

  private static getImageId(params: URLSearchParams): ImageId {
    return params.get('image');
  }

  private static getImageDecade(id: ImageId): number {
    return parseInt(`${id.split(',')[0].substring(0, 3)}0`);
  }

  private findImage(images: ImagesMapped): ImageMapped {
    const _images = Object.values(images).flat();

    _images.forEach(({ image: nestedImage }) => {
      if (nestedImage) {
        _images.push(nestedImage);
      }
    });

    return _images.find(image => image.id === this.selectedImageId);
  }

  constructor() {
    this.store = null;

    if (location.search) {
      const params = new URLSearchParams(location.search);

      if (params.has('image')) {
        const id = ImagesStore.getImageId(params);
        this.selectedImageId = id;
        this.selectedDecade = ImagesStore.getImageDecade(id);
      }
    }

    makeObservable(this, {
      store: observable,
      selectedImageId: observable,
      selectedDecade: observable,

      initialImageId: computed,
      initialDecade: computed,
      selectedImageUrl: computed,
      selectedImageYear: computed,
    });
  }
}

export const imagesStore = new ImagesStore();
