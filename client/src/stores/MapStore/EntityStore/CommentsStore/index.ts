import { makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntityStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntityStore/DotStore';
import PathStore from 'src/stores/MapStore/EntityStore/PathStore';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { CommentDto } from 'src/contracts/entities/comments';
import { CommentMapped, map } from 'src/stores/MapStore/EntityStore/CommentsStore/map';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { v4 as uuidv4 } from 'uuid';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { userStore } from 'src/stores/UserStore';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

export default class CommentsStore extends BaseAsyncStore<CommentDto[], CommentMapped[]> implements BaseStore {
  store: ObjectStore | DotStore | PathStore;
  currentValue: string;
  isReady: boolean;

  fetchApiData(entityType: EntityInstanceType, entityId: EntityId, imageId?: ImageId): void {
    let url = `${entityType}/${entityId}/comments`;

    if (imageId) {
      url += `/${imageId}`;
    }

    fetchData<CommentDto[], CommentMapped[]>(url, this.getApiOptions(map));
  }

  resetData(): void {
    this.currentValue = null;
    this.isReady = false;
    this.apiData = new AsyncData<CommentMapped[]>();
  }

  handleInput = (value: string): void => {
    this.currentValue = value;
  };

  async add(): Promise<void> {
    const { store, currentValue } = this;

    if (!currentValue) {
      return;
    }

    const { instanceType: originType, id: originId } = store.apiData.data;
    const id = uuidv4();
    const url = `/${originType}/${originId}/comments/${id}`;
    const { author } = userStore;
    const { selectedImageId: imageId } = imagesStore;

    const comment: CommentMapped = {
      id,
      originType,
      originId,
      imageId,
      text: currentValue,
      ...author,
    };

    try {
      const newCommentDto = await put<CommentDto, CommentMapped>(url, comment, 'json');
      const [newCommentMapped] = map([newCommentDto]);
      this.apiData.data.push(newCommentMapped);
      this.currentValue = '';
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    super(api);

    this.currentValue = '';
    this.isReady = false;

    makeObservable(this, {
      store: observable,
      currentValue: observable,
      isReady: observable,
    });
  }
}

export const commentsStore = new CommentsStore(api);
