import GlobalStore from './GlobalStore';
import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const globalStore = new GlobalStore(api);

export const stores = {
  globalStore: globalStore,
};

const StoresContext = React.createContext(stores);

export const useStores = (): typeof stores => React.useContext(StoresContext);
