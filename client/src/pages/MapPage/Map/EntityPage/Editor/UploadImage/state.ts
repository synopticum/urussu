import { computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { put } from 'src/stores/helpers';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import { ImageDto } from 'src/contracts/entities';
import { ImageMapped } from 'src/stores/MapStore/EntityStore';

class State {
  readonly minYear: string;
  readonly maxYear: string;

  image: File;
  year: string;
  isJoined: boolean;

  get isValid(): boolean {
    return this.isImageSelected && this.isYearValid && !imagesStore.isSelectedImageARetake;
  }

  get canBeJoined(): boolean {
    return !imagesStore.isEmpty && !imagesStore.hasSelectedImageRetaken && !imagesStore.isSelectedImageARetake;
  }

  get isImageSelected(): boolean {
    return Boolean(this.image);
  }

  get isYearSelected(): boolean {
    return Boolean(this.year);
  }

  get isYearValid(): boolean {
    const year = parseInt(this.year);
    const maxYear = parseInt(this.maxYear);
    let minYear = this.isJoined ? parseInt(imagesStore.selectedImageYear) : parseInt(this.minYear);

    if (this.isJoined) {
      minYear++;
    }

    return this.isYearSelected && year >= minYear && year <= maxYear;
  }

  resetData(): void {
    this.image = null;
    this.isJoined = false;
    this.year = null;
  }

  toggleIsJoined(): void {
    this.isJoined = !this.isJoined;
  }

  changeImage(inputRef: React.MutableRefObject<HTMLInputElement>): void {
    this.image = inputRef.current.files[0];
  }

  changeYear(value: string): void {
    this.year = value;
  }

  async upload(onUploadComplete: () => void): Promise<void> {
    const { data } = objectStore.apiData;
    const { selectedImageYear } = imagesStore;

    const yearName = this.isJoined ? `${selectedImageYear}_${this.year}` : this.year;
    const url = `/${data.instanceType}/${data.id}/photos/${yearName}`;

    const formData = new FormData();
    formData.append('photo', this.image);

    try {
      const imageDto: ImageDto = await put(url, formData, 'formData');
      imagesStore.addImage(imageDto as ImageMapped);
      this.resetData();
    } catch (e) {
      alert('hui');
      // handle somehow
    }

    onUploadComplete();
  }

  constructor() {
    this.minYear = '1940';
    this.maxYear = '2021';

    this.image = null;
    this.isJoined = false;
    this.year = null;

    makeObservable(this, {
      image: observable,
      year: observable,
      isJoined: observable,

      isImageSelected: computed,
      isYearSelected: computed,
      isValid: computed,
    });
  }
}

export default State;
