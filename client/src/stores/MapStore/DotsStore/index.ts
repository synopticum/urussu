import { AxiosInstance } from 'axios';
import { AsyncData, del, fetchData, put } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/entities/dot';
import { map } from 'src/stores/MapStore/DotsStore/map';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { EntityId } from 'src/contracts/entities';
import { control, Control, divIcon, LayerGroup, layerGroup, Marker, marker } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import { userStore } from 'src/stores/UserStore';
import { mapStore } from 'src/stores/MapStore';
import { getClassName } from 'src/pages/MapPage/Map/Container';

export default class DotsStore extends BaseAsyncStore<DotDto[], DotMapped[]> implements BaseStore {
  private layerControl: Control.Layers;
  private overlayMaps: {
    [layerName: string]: LayerGroup;
  };

  fetchApiData(): void {
    fetchData<DotDto[], DotMapped[]>('/dots', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<DotMapped[]>();
  }

  async add(): Promise<void> {
    const id = uuidv4();
    const url = `/dots/${id}`;

    const coordinates = mapStore.dotCreator.coordinates;
    const rotationAngle = 0;
    const layer = '1940';
    const authorId = userStore.author.authorId;

    const dot: DotMapped = {
      instanceType: 'dot',
      id,
      coordinates,
      rotationAngle,
      layer,
      authorId,
    };

    try {
      const newDotDto = await put<DotDto, DotMapped>(url, dot, 'json');
      const [newDotMapped] = map([newDotDto]);
      this.apiData.data.push(newDotMapped);
      this.draw();
    } catch (e) {
      alert('Ошибка');
      // handle somehow
    }
  }

  async remove(id: EntityId): Promise<void> {
    const url = `/dots/${id}`;

    try {
      await del(url);
      this.apiData.data = this.apiData.data.filter(item => item.id !== id);
      this.draw();
    } catch (e) {
      alert('Ошибка');
      // handle somehow
    }
  }

  draw(): void {
    this.removeCurrentLayersAndMarkers();
    this.addMarkersToMap();
    this.addLayersToMap();
  }

  private static getDotLayers(data: DotMapped[]): Set<string> {
    return new Set(data.map(dot => dot.layer));
  }

  private createMarker(item: DotMapped): Marker {
    const icon = divIcon({
      iconSize: [9, 9],
      className: getClassName(item),
    });

    const setEntity = (id: string): void => {
      mapStore.setEntity({ type: 'dot', id });
    };

    return marker(item.coordinates, {
      icon,
      draggable: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rotationAngle: item.rotationAngle || 0,
    }).on('click', () => setEntity(item.id));
  }

  private removeCurrentLayersAndMarkers(): void {
    const { map } = mapStore;

    if (this.layerControl) {
      this.layerControl.remove();
    }

    if (this.overlayMaps) {
      Object.values(this.overlayMaps).forEach(layer => map.removeLayer(layer));
    }
  }

  private addMarkersToMap(): void {
    const { data } = this.apiData;

    for (const layerName of DotsStore.getDotLayers(data)) {
      const layerDots = data.filter(dot => dot.layer === layerName);
      this.overlayMaps[layerName] = layerGroup(layerDots.map(this.createMarker));
    }
  }

  private addLayersToMap(): void {
    const { map } = mapStore;

    Object.values(this.overlayMaps).forEach(layer => layer.addTo(map));
    this.layerControl = control.layers(null, this.overlayMaps).addTo(map);
  }

  constructor(api: AxiosInstance) {
    super(api);

    this.layerControl = null;
    this.overlayMaps = {};
  }
}

export const dotsStore = new DotsStore(api);
