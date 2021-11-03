function compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader {
  // Create the shader object
  const shader = gl.createShader(shaderType);

  // Set the shader source code.
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check if it compiled
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    // Something went wrong during compilation; get the error
    throw 'could not compile shader:' + gl.getShaderInfoLog(shader);
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram {
  // create a program.
  const program = gl.createProgram();

  // attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // link the program.
  gl.linkProgram(program);

  // Check if it linked.
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    // something went wrong with the link
    throw 'program failed to link:' + gl.getProgramInfoLog(program);
  }

  return program;
}

function setup(
  canvas: HTMLCanvasElement,
  vshader_source: string,
  fshader_source: string,
  clearColor: [number, number, number],
): { gl: WebGLRenderingContext; program: WebGLProgram } {
  const gl = canvas.getContext('webgl');
  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(clearColor[0], clearColor[1], clearColor[2], 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const v_shader = compileShader(gl, vshader_source, gl.VERTEX_SHADER);
  const f_shader = compileShader(gl, fshader_source, gl.FRAGMENT_SHADER);
  const program = createProgram(gl, v_shader, f_shader);
  gl.useProgram(program);

  return { gl, program };
}

class DrawContext {
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

  constructor(canvas: HTMLCanvasElement, vshader_source: string, fshader_source: string) {
    const bgColor = this.getColor(256, 256, 256);
    const { gl, program } = setup(canvas, vshader_source, fshader_source, bgColor);

    this.canvas = canvas;
    this.gl = gl;
    this.program = program;
  }
}

export default DrawContext;
