import { makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntitiesStore/DotStore';
import PathStore from 'src/stores/MapStore/EntitiesStore/PathStore';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { CommentDto } from 'src/contracts/entities/comments';
import { CommentMapped, map } from 'src/stores/MapStore/EntitiesStore/CommentsStore/map';
import { EntityId, EntityType } from 'src/contracts/entities';
import { v4 as uuidv4 } from 'uuid';
import { api } from 'src/stores';
import { userStore } from 'src/stores/UserStore';

export default class CommentsStore {
  private api: AxiosInstance;

  apiData = new AsyncData<CommentMapped[]>();

  store: ObjectStore | DotStore | PathStore;

  fetchApiData(type: EntityType, id: EntityId): void {
    const { apiData } = this;
    const options = { apiData, map };

    fetchData<CommentDto[], CommentMapped[]>(`/${type}/${id}/comments`, options);
  }

  resetData(): void {
    this.apiData = new AsyncData<CommentMapped[]>();
  }

  async addComment(text: string): Promise<void> {
    const { store } = this;
    const { instanceType: originType, id: originId } = store.apiData.data;
    const commentId = uuidv4();
    const url = `/${originType}/${originId}/comments/${commentId}`;
    const { author } = userStore;

    const comment: CommentMapped = {
      id: commentId,
      originType,
      originId,
      date: Date.now().toString(),
      text,
      ...author,
    };

    try {
      const newComment = await put<CommentDto, CommentMapped>(url, comment, 'json');
      this.apiData.data.push(newComment);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}

export const commentsStore = new CommentsStore(api);
