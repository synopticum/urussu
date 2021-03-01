import GlobalStore from './GlobalStore';
import MapStore from './MapStore';
import DotsStore from './MapStore/DotsStore';
import ObjectsStore from './MapStore/ObjectsStore';
import PathsStore from './MapStore/PathsStore';
import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export const globalStore = new GlobalStore(api);
export const mapStore = new MapStore();
export const dotsStore = new DotsStore(api);
export const objectsStore = new ObjectsStore(api);
export const pathsStore = new PathsStore(api);
