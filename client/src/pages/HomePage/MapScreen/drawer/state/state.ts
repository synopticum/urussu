import Drawer from '../drawer';
import Triangle from './Triangle';

class State {
  drawer: Drawer;
  triangle: Triangle;

  clearAll(): void {
    // console.log(123)
  }

  constructor(canvas: HTMLCanvasElement) {
    this.drawer = new Drawer(canvas);

    this.triangle = new Triangle(this.drawer);
  }
}

export default State;
