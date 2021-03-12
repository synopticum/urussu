import { computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { EntityId, EntityInstanceType } from 'src/contracts/entities';
import { put } from 'src/stores/helpers';

class State {
  image: File;
  year: string;
  isJoined: boolean;

  get isFileSelected(): boolean {
    return Boolean(this.image);
  }

  get isYearSelected(): boolean {
    return Boolean(this.year);
  }

  toggleIsJoined(): void {
    this.isJoined = !this.isJoined;
  }

  change(inputRef: React.MutableRefObject<HTMLInputElement>): void {
    this.image = inputRef.current.files[0];
  }

  async upload(
    entityType: EntityInstanceType,
    entityId: EntityId,
    selectedImageYear: string,
    onUploadComplete: () => void,
  ): Promise<void> {
    const yearName = this.isJoined ? `${selectedImageYear}_${this.year}` : this.year;
    const url = `/${entityType}/${entityId}/photos/${yearName}`;

    const formData = new FormData();
    formData.append('photo', this.image);

    try {
      await put(url, formData, 'formData');
      this.image = null;
    } catch (e) {
      alert('hui');
      // handle somehow
    }

    onUploadComplete();
  }

  constructor() {
    this.image = null;
    this.isJoined = false;
    this.year = null;

    makeObservable(this, {
      image: observable,
      isJoined: observable,
      isFileSelected: computed,
    });
  }
}

export default State;
