import { fshader_source, vshader_source } from '../shader';

export function compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader {
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

export function createProgram(
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

export function setup(
  canvas: HTMLCanvasElement,
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
