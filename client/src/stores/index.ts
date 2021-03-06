import GlobalStore from './GlobalStore';
import AuthStore from './AuthStore';
import UserStore from './UserStore';
import MapStore from './MapStore';

import DotsStore from './MapStore/EntitiesStore/DotsStore';
import ObjectsStore from './MapStore/EntitiesStore/ObjectsStore';
import PathsStore from './MapStore/EntitiesStore/PathsStore';

import DotStore from './MapStore/EntitiesStore/DotStore';
import ObjectStore from './MapStore/EntitiesStore/ObjectStore';
import PathStore from './MapStore/EntitiesStore/PathStore';

import ImagesStore from 'src/stores/MapStore/EntitiesStore/ImagesStore';

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const globalStore = new GlobalStore(api);
export const authStore = new AuthStore(api);
export const userStore = new UserStore(api);
export const mapStore = new MapStore(api);

export const dotsStore = new DotsStore(api);
export const objectsStore = new ObjectsStore(api);
export const pathsStore = new PathsStore(api);

export const dotStore = new DotStore(api);
export const objectStore = new ObjectStore(api);
export const pathStore = new PathStore(api);

export const imagesStore = new ImagesStore();
