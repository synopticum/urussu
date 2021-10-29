import Drawer from '../drawer';
import { Mat4 } from 'cuon-matrix-ts';

class Triangle {
  private v = [
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
  // private vertices = [-1.0, 1.0, 0.0, 1.0, -1.0, -1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 0.0];
  private readonly drawer: Drawer;

  // private g_last: number = Date.now();
  // private ANGLE_STEP = 45.0;

  // angle = 0.0;
  // translateX = 0.0;
  raf: number = null;

  draw(): void {
    this._draw();
  }

  private _draw(): void {
    // this.angle = this.animate(this.angle);
    // this.translateX = 0.5;

    const { gl, program } = this.drawer;
    this.drawer.clear();

    const vertices = new Float32Array(this.v);
    const FSIZE = vertices.BYTES_PER_ELEMENT;
    // const radian = (Math.PI * this.angle) / 180;

    // const modelMatrix = new Mat4();
    // modelMatrix.setRotate(this.angle, 0, 0, 1);
    // modelMatrix.translate(this.Tx, 0, 0);

    // const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');
    // gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
    gl.enableVertexAttribArray(a_TexCoord);
    this.initTexture(6);

    // this.raf = window.requestAnimationFrame(() => this._draw());
  }

  clear(): void {
    cancelAnimationFrame(this.raf);
    this.drawer.clear();
  }

  private initTexture(n: number): void {
    const { gl, program } = this.drawer;
    const texture0 = gl.createTexture();
    const texture1 = gl.createTexture();
    const u_Sampler0 = gl.getUniformLocation(program, 'u_Sampler0');
    const u_Sampler1 = gl.getUniformLocation(program, 'u_Sampler1');

    const image0 = new Image();
    image0.onload = (): void => this.loadTexture(image0, n, 0, u_Sampler0, texture0);
    image0.src = '/images/splash-houses.jpg';

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
    const { gl } = this.drawer;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    if (texUnit === 0) {
      gl.activeTexture(gl.TEXTURE0);
      this.g_texUnit0 = true;
    } else {
      gl.activeTexture(gl.TEXTURE1);
      this.g_texUnit1 = true;
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
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

  // private animate(angle: number): number {
  //   const now = Date.now();
  //   const elapsed = now - this.g_last;
  //   this.g_last = now;
  //
  //   let newAngle = angle + (this.ANGLE_STEP * elapsed) / 1000.0;
  //   return (newAngle %= 360);
  // }

  constructor(drawer: Drawer) {
    this.drawer = drawer;
  }
}

export default Triangle;
