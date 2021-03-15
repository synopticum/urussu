import { computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import React from 'react';
import { put } from 'src/stores/helpers';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import { ImageDto } from 'src/contracts/entities';
import { ImageMapped } from 'src/stores/MapStore/EntityStore';
import { ValidationState, isValid } from 'src/components/ValidationState';

class UploadImageValidation {
  root: UploadImageState;

  get selectYear(): ValidationState {
    return {
      'Загружаемое фото не выбрано': !this.root.isImageSelected,
    };
  }

  get join(): ValidationState {
    return {
      'Загружаемое фото не выбрано': !this.root.isImageSelected,
      'Оригинальное фото не выбрано': imagesStore.isEmpty,
      'Оригинальное фото уже переснято': imagesStore.hasSelectedImageRetaken,
      'Пересъемка пересъемки запрещена': imagesStore.isSelectedImageARetake,
    };
  }

  get submit(): ValidationState {
    return {
      'Загружаемое фото не выбрано': !this.root.isImageSelected,
      'Год не выбран': !this.root.isYearValid,
      'Фото уже переснято': imagesStore.isSelectedImageARetake,
    };
  }

  constructor(root: UploadImageState) {
    this.root = root;
    makeAutoObservable(this);
  }
}

class UploadImageState {
  readonly minYear: string = '1940';
  readonly maxYear: string = '2021';

  image: File;
  year: string;
  isJoined: boolean;
  validation: UploadImageValidation;

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
    this.year = '';
  }

  toggleIsJoined(): void {
    this.isJoined = !this.isJoined;
  }

  changeImage(image: File): void {
    this.image = image;
  }

  changeYear(value: string): void {
    this.year = value;
  }

  async submit(onUploadComplete: () => void): Promise<void> {
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
    this.validation = new UploadImageValidation(this);
    this.image = null;
    this.isJoined = false;
    this.year = '';

    makeAutoObservable(this);
  }
}

export default UploadImageState;
