import { computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntityStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntityStore/DotStore';
import PathStore from 'src/stores/MapStore/EntityStore/PathStore';
import { BaseStore } from 'src/stores';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { ImagesDto } from 'src/contracts/entities';
import { EntityMapped } from 'src/stores/MapStore';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { del } from 'src/stores/helpers';
import { ValidationState } from 'src/components/ValidationState';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';
import { dotsStore } from 'src/stores/MapStore/DotsStore';
import { pathsStore } from 'src/stores/MapStore/PathsStore';

class EditorValidation {
  get removeButton(): ValidationState {
    return {
      'Фото для удаления не выбрано': imagesStore.isEmpty,
      'Сначала удалите переснятое фото': imagesStore.hasSelectedImageRetaken,
    };
  }

  constructor() {
    makeAutoObservable(this);
  }
}

class EditorState {
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images: ImagesDto;

  setTitle(title: string): void {
    this.title = title;
  }

  setShortDescription(shortDescription: string): void {
    this.shortDescription = shortDescription;
  }

  setFullDescription(fullDescription: string): void {
    this.fullDescription = fullDescription;
  }

  constructor(entity: EntityMapped) {
    this.title = entity.title;
    this.shortDescription = entity.shortDescription;
    this.fullDescription = entity.fullDescription;
    this.thumbnail = entity.thumbnail;
    this.images = entity.images;

    makeObservable(this, {
      title: observable,
      shortDescription: observable,
      fullDescription: observable,
    });
  }
}

export class ObjectState extends EditorState {
  street: string;
  house: string;
  noAddress: boolean;

  setStreet(street: string): void {
    this.street = street;
  }

  setHouse(house: string): void {
    this.house = house;
  }

  toggleNoAddress(): void {
    if (!this.noAddress) {
      this.street = '';
      this.house = '';
    }

    this.noAddress = !this.noAddress;
  }

  constructor(entity: ObjectMapped) {
    super(entity);

    this.street = entity.street;
    this.house = entity.house;
    this.noAddress = entity.noAddress || false;

    makeObservable(this, {
      street: observable,
      house: observable,
      noAddress: observable,
    });
  }
}

export class DotState extends EditorState {
  layer: string;
  rotationAngle: number;

  setLayer(layer: string): void {
    this.layer = layer;
  }

  setRotationAngle(rotationAngle: number): void {
    this.rotationAngle = rotationAngle;
  }

  constructor(entity: DotMapped) {
    super(entity);

    this.layer = entity.layer;
    this.rotationAngle = entity.rotationAngle || 0;

    makeObservable(this, {
      layer: observable,
      rotationAngle: observable,
    });
  }
}

export class PathState extends EditorState {
  constructor(entity: PathMapped) {
    super(entity);
  }
}

type Store = ObjectStore | DotStore | PathStore;

type State = DotState | ObjectState | PathState;

export default class EditorStore implements BaseStore {
  store: Store;
  state: State;
  validation: EditorValidation;
  isConfirmation: boolean;
  isReady: boolean;

  initData(store: Store, state: State): void {
    this.store = store;
    this.state = state;
  }

  resetData(): void {
    this.store = null;
    this.state = null;
    this.validation = new EditorValidation();
    this.isConfirmation = false;
    this.isReady = false;
  }

  removeEntity(): void {
    const { data } = this.store.apiData;

    const stores = {
      dot: dotsStore,
      object: objectsStore,
      path: pathsStore,
    };

    stores[data.instanceType].remove(data.id);
  }

  async removeImage(): Promise<void> {
    const { data } = this.store.apiData;
    const url = `/${data.instanceType}/${data.id}/photos/${imagesStore.selectedImageYearName}`;

    try {
      await del(url);
      imagesStore.removeImage(imagesStore.selectedImageId);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  constructor() {
    this.store = null;
    this.state = null;
    this.validation = new EditorValidation();
    this.isConfirmation = false;
    this.isReady = false;

    makeObservable(this, {
      store: observable,
      state: observable,
      validation: observable,
      isConfirmation: observable,
      isReady: observable,
    });
  }
}

export const editorStore = new EditorStore();
