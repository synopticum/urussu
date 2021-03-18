import { computed, makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntityStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntityStore/DotStore';
import { ImageMapped, ImagesMapped } from 'src/stores/MapStore/EntityStore';
import PathStore from 'src/stores/MapStore/EntityStore/PathStore';
import { BaseStore } from 'src/stores';
import { ImageId } from 'src/contracts/entities';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import React, { MouseEvent } from 'react';

export default class ImagesStore implements BaseStore {
  private static DECADES = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  store: ObjectStore | DotStore | PathStore;
  selectedImageId: ImageId;
  selectedDecade: number;
  isImageLoading: boolean;
  clientWidth: number;
  clientHeight: number;
  naturalWidth: number;
  naturalHeight: number;
  ref: React.MutableRefObject<HTMLImageElement>;

  get selectedImage(): ImageMapped {
    return this.findImage(this.selectedImageId);
  }

  get isEmpty(): boolean {
    const { data } = this.store.apiData;
    return !data || !data.images;
  }

  get hasSelectedImageRetaken(): boolean {
    return Boolean(this.selectedImage && this.selectedImage.image);
  }

  get isSelectedImageARetake(): boolean {
    return Boolean(this.selectedImageId?.split(',')[0].includes('_'));
  }

  get selectedImageUrl(): string {
    if (this.isEmpty) {
      return null;
    }

    const image = this.findImage();

    return `${process.env.S3_URL}/${image.url}`;
  }

  get selectedImageYear(): string {
    if (this.isEmpty) {
      return null;
    }

    const image = this.findImage();

    return image.year;
  }

  get selectedImageYearName(): string {
    return this.selectedImageId.split(',')[0];
  }

  get initialDecade(): number {
    if (this.isEmpty) {
      return null;
    }

    const { data } = this.store.apiData;

    return this.getMaxDecadeWithImage(data.images);
  }

  get initialImageId(): ImageId {
    if (this.isEmpty) {
      return null;
    }

    const { data } = this.store.apiData;

    const decade = this.getMaxDecadeWithImage(data.images);

    return data.images[decade][0].id;
  }

  private static getImageId(params: URLSearchParams): ImageId {
    return params.get('image');
  }

  private static getImageDecade(id: ImageId): number {
    return parseInt(`${id.split(',')[0].substring(0, 3)}0`);
  }

  resetData(): void {
    this.store = null;
    this.selectedImageId = null;
    this.selectedDecade = null;
    this.isImageLoading = true;
    this.clientWidth = 0;
    this.clientHeight = 0;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.ref = null;
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

  changeSelectedImageId(id: ImageId): void {
    this.selectedImageId = id;
    this.isImageLoading = true;
    commentsStore.fetchApiData(this.store.entityType, this.store.entityId, id);
  }

  isDecadeActive(decade: string): boolean {
    return this.selectedDecade === parseInt(decade);
  }

  isImageActive(id: ImageId): boolean {
    return id === this.selectedImageId;
  }

  addImage(imageMapped: ImageMapped): void {
    const { data } = this.store.apiData;
    const { year, id } = imageMapped;
    const decade = parseInt(`${year.substring(0, 3)}0`);

    if (!data.images) {
      data.images = {};
    }

    if (!data.images[decade]) {
      data.images[decade] = [];
    }

    if (!imageMapped.id.includes('_')) {
      data.images[decade].push(imageMapped);
      this.selectedDecade = decade;
    } else {
      const originalYear = imageMapped.id.split('_')[0];
      const originalDecade = parseInt(`${originalYear.toString().substring(0, 3)}0`);
      const original = data.images[originalDecade].find(item => item.year === originalYear);

      original.image = imageMapped;
      this.selectedDecade = originalDecade;
    }

    this.selectedImageId = id;
  }

  removeImage(id: ImageId): void {
    if (this.isEmpty) {
      return null;
    }

    const { data } = this.store.apiData;

    for (const decade in data.images) {
      if (data.images.hasOwnProperty(decade)) {
        const images = data.images[decade];

        for (const index in images) {
          if (images.hasOwnProperty(index)) {
            const image = images[index];

            if (image.id === id) {
              delete images[index];
            } else if (image.image) {
              if (image.image.id === id) {
                delete image.image;
              }
            }
          }
        }

        data.images[decade] = data.images[decade].filter(item => Boolean(item));

        if (!data.images[decade].length) {
          delete data.images[decade];
        }
      }
    }

    if (!Object.keys(data.images).length) {
      delete data.images;
    }

    this.selectedImageId = this.initialImageId;
    this.selectedDecade = this.initialDecade;
  }

  private getMaxDecadeWithImage(images: ImagesMapped): number {
    return Math.max(...Object.keys(images).map(decade => parseInt(decade)));
  }

  private findImage(id?: ImageId): ImageMapped {
    if (this.isEmpty) {
      return null;
    }

    const { data } = this.store.apiData;

    const _images = Object.values(data.images).flat();
    const imageId = id || this.selectedImageId;

    _images.forEach(({ image: nestedImage }) => {
      if (nestedImage) {
        _images.push(nestedImage);
      }
    });

    return _images.find(image => image.id === imageId);
  }

  get aspectRatio(): number {
    return this.clientWidth / this.clientHeight;
  }

  get height(): string {
    if (!this.ref || !this.ref.current) {
      return 'auto';
    }

    const current = this.ref.current;
    const { clientWidth: parentWidth } = current.parentElement;

    return this.naturalHeight > parentWidth ? '100%' : 'auto';
  }

  get scale(): number {
    if (!this.ref || !this.ref.current) {
      return 1;
    }

    const current = this.ref.current;
    const { clientWidth: parentWidth, clientHeight: parentHeight } = current.parentElement;
    const scale =
      this.naturalHeight > parentHeight ? parentWidth / this.clientWidth : parentWidth / this.clientWidth - 1;
    const roundedScale = parseFloat(Number(scale).toFixed(4));

    return this.aspectRatio > 1 ? roundedScale : 1;
  }

  get moveRange(): number {
    if (!this.ref || !this.ref.current) {
      return null;
    }

    const currentHeight = this.ref.current.clientHeight;
    const range = (currentHeight * this.scale - currentHeight) / this.scale;

    return parseInt(Number(range).toFixed());
  }

  move(e: MouseEvent<HTMLDivElement>): void {
    if (!this.ref || !this.ref.current) {
      return null;
    }

    if (this.naturalHeight < this.clientHeight) {
      return null;
    }

    const currentHeight = this.ref.current.clientHeight;
    const y = e.pageY - 94;
    const rangeScale = currentHeight / this.moveRange;

    const translateY = parseInt(Number(y / rangeScale - this.moveRange / 2).toFixed());

    this.ref.current.style.transform = `scale(${this.scale}) translateY(${translateY}px)`;
  }

  constructor() {
    this.store = null;
    this.isImageLoading = true;
    this.clientWidth = 0;
    this.clientHeight = 0;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.ref = null;

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
      isImageLoading: observable,
      clientWidth: observable,
      clientHeight: observable,
      naturalWidth: observable,
      naturalHeight: observable,
      ref: observable,

      initialImageId: computed,
      initialDecade: computed,
      selectedImage: computed,
      selectedImageUrl: computed,
      selectedImageYear: computed,
      isEmpty: computed,
      isSelectedImageARetake: computed,
      hasSelectedImageRetaken: computed,

      height: computed,
      scale: computed,
      moveRange: computed,
      aspectRatio: computed,
    });
  }
}

export const imagesStore = new ImagesStore();
