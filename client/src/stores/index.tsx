import GlobalStore from './GlobalStore';
import MapStore from './MapStore';
import DotsStore from './MapStore/DotsStore';
import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const globalStore = new GlobalStore(api);
export const mapStore = new MapStore();
export const dotsStore = new DotsStore(api);

export const stores = {
  globalStore,
  mapStore,
  dotsStore,
};

const StoresContext = React.createContext(stores);

export const useStores = (): typeof stores => React.useContext(StoresContext);
