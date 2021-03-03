import GlobalStore from './GlobalStore';
import AuthStore from './AuthStore';
import UserStore from './UserStore';
import MapStore from './MapStore';
import DotsStore from './MapStore/DotsStore';
import ObjectsStore from './MapStore/ObjectsStore';
import PathsStore from './MapStore/PathsStore';
import ObjectStore from './MapStore/ObjectStore';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const globalStore = new GlobalStore(api);
export const authStore = new AuthStore(api);
export const userStore = new UserStore(api);
export const mapStore = new MapStore();
export const dotsStore = new DotsStore(api);
export const objectsStore = new ObjectsStore(api);
export const pathsStore = new PathsStore(api);
export const objectStore = new ObjectStore(api);
