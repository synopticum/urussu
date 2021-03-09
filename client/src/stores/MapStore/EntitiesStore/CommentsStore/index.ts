import { makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntitiesStore/DotStore';
import PathStore from 'src/stores/MapStore/EntitiesStore/PathStore';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { CommentDto } from 'src/contracts/entities/comments';
import { CommentMapped, map } from 'src/stores/MapStore/EntitiesStore/CommentsStore/map';
import { EntityId, EntityType, ImageId } from 'src/contracts/entities';
import { v4 as uuidv4 } from 'uuid';
import { api, BaseStore } from 'src/stores';
import { userStore } from 'src/stores/UserStore';
import React from 'react';
import { imagesStore } from 'src/stores/MapStore/EntitiesStore/ImagesStore';

export default class CommentsStore implements BaseStore {
  private api: AxiosInstance;

  currentValue: string;

  apiData = new AsyncData<CommentMapped[]>();

  store: ObjectStore | DotStore | PathStore;

  fetchApiData(entityType: EntityType, entityId: EntityId, imageId?: ImageId): void {
    const { apiData } = this;
    const options = { apiData, map };
    let url = `${entityType}/${entityId}/comments`;

    if (imageId) {
      url += `/${imageId}`;
    }

    fetchData<CommentDto[], CommentMapped[]>(url, options);
  }

  resetData(): void {
    this.currentValue = null;
    this.apiData = new AsyncData<CommentMapped[]>();
  }

  handleCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
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
    this.api = api;
    this.currentValue = '';

    makeObservable(this, {
      apiData: observable,
      store: observable,
      currentValue: observable,
    });
  }
}

export const commentsStore = new CommentsStore(api);
