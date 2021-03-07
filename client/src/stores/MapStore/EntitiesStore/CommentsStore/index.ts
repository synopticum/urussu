import { makeObservable, observable } from 'mobx';
import ObjectStore from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import DotStore from 'src/stores/MapStore/EntitiesStore/DotStore';
import PathStore from 'src/stores/MapStore/EntitiesStore/PathStore';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { CommentDto } from 'src/contracts/entities/comments';
import { CommentMapped, map } from 'src/stores/MapStore/EntitiesStore/CommentsStore/map';
import { EntityId, EntityType } from 'src/contracts/entities';
import { Token } from 'src/stores/AuthStore';
import { v4 as uuidv4 } from 'uuid';

export default class CommentsStore {
  private api: AxiosInstance;

  apiData = new AsyncData<CommentMapped[]>();

  store: ObjectStore | DotStore | PathStore;

  fetchApiData(type: EntityType, id: EntityId): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<CommentDto[], CommentMapped[]>(`/${type}/${id}/comments`, options);
  }

  resetData(): void {
    this.apiData = new AsyncData<CommentMapped[]>();
  }

  async addComment(data: Omit<CommentMapped, 'id' | 'date' | 'originType' | 'originId'>, token: Token): Promise<void> {
    const { api, store } = this;
    const { instanceType: originType, id: originId } = store.apiData.data;
    const commentId = uuidv4();
    const url = `/${originType}/${originId}/comments/${commentId}`;

    const comment: CommentMapped = {
      id: commentId,
      originType,
      originId,
      date: Date.now().toString(),
      ...data,
    };

    const d = await put<CommentDto, CommentMapped>(url, comment, { api, type: 'json', token });

    console.log(d);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}
