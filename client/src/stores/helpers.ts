import { makeAutoObservable } from 'mobx';
import { AxiosInstance } from 'axios';
import { Token } from 'src/stores/AuthStore';

export class AsyncData<T> {
  isFetching: boolean;
  isDataLoaded: boolean;
  error: string;
  data: T;

  constructor() {
    this.isFetching = false;
    this.isDataLoaded = false;
    this.error = null;
    this.data = null;

    makeAutoObservable(this);
  }
}

type FetchDataOptions<Dto, Mapped> = {
  api: AxiosInstance;
  apiData: AsyncData<Mapped>;
  map: (data: Dto) => Mapped;
  token?: Token;
};

export const fetchData = async function <Dto, Mapped>(
  url: string,
  options: FetchDataOptions<Dto, Mapped>,
): Promise<void> {
  const { apiData, api, map, token } = options;

  apiData.isFetching = true;

  try {
    const { data } = await api.get<Dto>(url, {
      headers: {
        token,
      },
    });

    apiData.error = null;
    apiData.data = map(data);
    apiData.isFetching = false;
    apiData.isDataLoaded = true;
  } catch (e) {
    apiData.error = e.message;
    apiData.isFetching = false;
  }
};

type PutDataOptions<Dto, Mapped> = {
  api: AxiosInstance;
  type: 'json' | 'formData';
  token?: Token;
};

const contentTypes = {
  json: 'application/json',
  formData: 'multipart/form-data',
};

export const put = async function <Dto, Mapped>(
  url: string,
  model: Mapped,
  options: PutDataOptions<Dto, Mapped>,
): Promise<Dto> {
  const { api, type, token } = options;

  const { data } = await api.put<Dto>(url, model, {
    headers: {
      token,
      'Content-Type': contentTypes[type],
    },
  });

  return data;
};
