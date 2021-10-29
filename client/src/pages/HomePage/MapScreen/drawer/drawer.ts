import { setup } from './helpers';

class Drawer {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  program: WebGLProgram;

  clear(): void {
    const color = this.getColor(256, 256, 256);
    this.gl.clearColor(color[0], color[1], color[2], 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  getColor(red: number, green: number, blue: number): [number, number, number] {
    return [red / 256, green / 256, blue / 256];
  }

  constructor(canvas: HTMLCanvasElement) {
    const bgColor = this.getColor(256, 256, 256);
    const { gl, program } = setup(canvas, bgColor);

    this.canvas = canvas;
    this.gl = gl;
    this.program = program;
  }
}

export default Drawer;
