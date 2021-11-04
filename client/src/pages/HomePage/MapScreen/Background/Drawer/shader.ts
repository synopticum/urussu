// language=GLSL
export const vshader_source = `
  attribute vec3 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;

  uniform mat4 u_TextureMatrix;

  void main() {
    gl_Position = vec4(a_Position, 1.0);

    vec4 newTexCoord = u_TextureMatrix * vec4(a_TexCoord, 0.0, 1.0);
    v_TexCoord = vec2(newTexCoord);
  }
`;

// language=GLSL
export const fshader_source = `
  precision mediump float;
  varying vec2 v_TexCoord;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;

  void main() {
    vec4 color0 = texture2D(u_Sampler0, v_TexCoord);
    vec4 color1 = texture2D(u_Sampler1, v_TexCoord);
//    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    gl_FragColor = color0;
  }
`;
