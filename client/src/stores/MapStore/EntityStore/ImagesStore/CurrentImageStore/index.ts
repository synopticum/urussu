import { computed, makeObservable, observable } from 'mobx';
import { BaseStore } from 'src/stores';
import React, { MouseEvent } from 'react';

export default class CurrentImageStore implements BaseStore {
  isImageLoading: boolean;
  clientWidth: number;
  clientHeight: number;
  naturalWidth: number;
  naturalHeight: number;
  ref: React.MutableRefObject<HTMLImageElement>;

  resetData(): void {
    this.isImageLoading = true;
    this.clientWidth = 0;
    this.clientHeight = 0;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.ref = null;
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

  getTranslateY(mouseY: number, min: number, max: number): number {
    const currentHeight = this.ref.current.clientHeight;
    const headerHeight = 94;
    const y = mouseY - headerHeight;
    const rangeScale = currentHeight / this.moveRange;

    const multiplier = 2;
    const translateY = parseInt(Number(y / rangeScale - this.moveRange / 2).toFixed()) * multiplier;

    if (translateY > max) {
      return max;
    }

    if (translateY < min) {
      return min;
    }

    return translateY;
  }

  move(e: MouseEvent<HTMLDivElement>): void {
    if (!this.ref || !this.ref.current) {
      return null;
    }

    // Don't move images smaller than viewport area
    if (this.naturalHeight < this.clientHeight) {
      return null;
    }

    const translateY = this.getTranslateY(e.pageY, -this.moveRange / 2, this.moveRange / 2);

    this.ref.current.style.transform = `scale(${this.scale}) translateY(${translateY}px)`;
  }

  constructor() {
    this.isImageLoading = true;
    this.clientWidth = 0;
    this.clientHeight = 0;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.ref = null;

    makeObservable(this, {
      isImageLoading: observable,
      clientWidth: observable,
      clientHeight: observable,
      naturalWidth: observable,
      naturalHeight: observable,
      ref: observable,

      height: computed,
      scale: computed,
      moveRange: computed,
      aspectRatio: computed,
    });
  }
}

export const currentImageStore = new CurrentImageStore();
