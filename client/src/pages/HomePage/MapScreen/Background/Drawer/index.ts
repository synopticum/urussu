import DrawContext from 'src/components/DrawContext';
import { fshader_source, vshader_source } from './shader';
import { computed, makeObservable, observable } from 'mobx';
import { vec3, mat4 } from 'gl-matrix';
import { MouseEvent } from 'react';
import { clamp } from 'src/utils/math';

type MousePosition = {
  x: number;
  y: number;
};

type MouseWebGLPosition = MousePosition;

class Drawer {
  raf: number = null;

  get isReady(): boolean {
    return Boolean(this.context);
  }

  private readonly vertices = [
    // vertex 1.1
    -1.0,
    1.0,
    0.0,
    // texture 1.1
    0.0,
    1.0,
    // vertex 1.2
    -1.0,
    -1.0,
    0.0,
    // texture 1.2
    0.0,
    0.0,
    // vertex 1.3
    1.0,
    1.0,
    0.0,
    // texture 1.3
    1.0,
    1.0,
    // vertex 2.1
    1.0,
    -1.0,
    0.0,
    // texture 2.1
    1.0,
    0.0,
    // vertex 2.2
    -1.0,
    -1.0,
    0.0,
    // texture 2.2
    0.0,
    0.0,
    // vertex 2.3
    1.0,
    1.0,
    0.0,
    // texture 2.3
    1.0,
    1.0,
  ];
  private context: DrawContext;

  draw(): void {
    this._draw();
  }

  tx = 0.0;
  ty = 0.0;

  private _draw(): void {
    const { gl, program, canvas } = this.context;
    this.context.clear();

    const vertices = new Float32Array(this.vertices);
    const F_SIZE = vertices.BYTES_PER_ELEMENT;

    const TEXTURE_WIDTH = 2560;
    const TEXTURE_HEIGHT = 1440;
    const widthRatio = canvas.clientWidth / TEXTURE_WIDTH;
    const heightRatio = canvas.clientHeight / TEXTURE_HEIGHT;

    const textureMatrix = mat4.create();

    const scale = vec3.create();
    vec3.set(scale, widthRatio, heightRatio, 0.0);
    mat4.scale(textureMatrix, textureMatrix, scale);

    const translation = vec3.create();
    // vec3.set(translation, clamp(this.tx, -0.02, 0.02), clamp(this.ty, -0.01, 0.01), 0.0);
    vec3.set(translation, this.tx, this.ty, 0.0);
    mat4.translate(textureMatrix, textureMatrix, translation);

    const u_TextureMatrix = gl.getUniformLocation(program, 'u_TextureMatrix');
    gl.uniformMatrix4fv(u_TextureMatrix, false, textureMatrix);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, F_SIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, F_SIZE * 5, F_SIZE * 3);
    gl.enableVertexAttribArray(a_TexCoord);
    this.initTexture(6);

    // this.raf = window.requestAnimationFrame(() => this._draw());
  }

  clear(): void {
    cancelAnimationFrame(this.raf);
    this.context.clear();
  }

  private texture: HTMLImageElement = null;

  private initTexture(n: number): void {
    const { gl, program } = this.context;
    const texture0 = gl.createTexture();
    const texture1 = gl.createTexture();
    const u_Sampler0 = gl.getUniformLocation(program, 'u_Sampler0');
    const u_Sampler1 = gl.getUniformLocation(program, 'u_Sampler1');

    if (!this.texture) {
      this.texture = new Image();
      this.texture.onload = (): void => this.loadTexture(this.texture, n, 0, u_Sampler0, texture0);
      this.texture.src = '/images/splash-houses.jpg';
    } else {
      this.loadTexture(this.texture, n, 0, u_Sampler0, texture0);
    }

    // const image1 = new Image();
    // image1.onload = (): void => this.loadTexture(image1, n, 1, u_Sampler1, texture1);
    // image1.src = '/images/splash-houses.jpg';
  }

  private g_texUnit0 = false;
  private g_texUnit1 = false;

  private loadTexture(
    image: HTMLImageElement,
    n: number,
    texUnit: number,
    u_Sampler: WebGLUniformLocation,
    texture: WebGLTexture,
  ): void {
    const { gl } = this.context;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    if (texUnit === 0) {
      gl.activeTexture(gl.TEXTURE0);
      this.g_texUnit0 = true;
    } else {
      gl.activeTexture(gl.TEXTURE1);
      this.g_texUnit1 = true;
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler, texUnit);

    // if (this.g_texUnit0 && this.g_texUnit1) {
    //   gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
    // }

    if (this.g_texUnit0) {
      gl.drawArrays(gl.TRIANGLES, 0, n);
    }
  }

  private static getRelativeMousePosition(event: MouseEvent<HTMLCanvasElement>): MousePosition {
    const target = event.target as HTMLCanvasElement;
    const rect = target.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private static getNoPaddingNoBorderCanvasRelativeMousePosition(event: MouseEvent<HTMLCanvasElement>): MousePosition {
    const target = event.target as HTMLCanvasElement;
    const position = Drawer.getRelativeMousePosition(event);

    position.x = (position.x * target.width) / target.clientWidth;
    position.y = (position.y * target.height) / target.clientHeight;

    return position;
  }

  private getMousePosition(event: MouseEvent<HTMLCanvasElement>): MouseWebGLPosition {
    const { gl } = this.context;
    const position = Drawer.getNoPaddingNoBorderCanvasRelativeMousePosition(event);
    const x = (position.x / gl.canvas.width) * 2 - 1;
    const y = (position.y / gl.canvas.height) * -2 + 1;

    return { x, y };
  }

  mouseMove(e: MouseEvent<HTMLCanvasElement>): void {
    const position = this.getMousePosition(e);
    this.tx = position.x;
    this.ty = position.y;
  }

  initialize(canvas: HTMLCanvasElement): void {
    this.context = new DrawContext(canvas, vshader_source, fshader_source);
    this.draw();
  }

  constructor() {
    makeObservable(this, {
      isReady: computed,
    });
  }
}

export default Drawer;
