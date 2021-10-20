var vertexShader = `
        varying vec3 vPos;
        void main()	{
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `;
var fragmentShader = `

        varying vec3 vPos;
        uniform vec3 size;
        uniform float thickness;
        uniform float smoothness;

        void main() {

          float a = smoothstep(thickness, thickness + smoothness, length(abs(vPos.xy) - size.xy));
          a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.yz) - size.yz));
          a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.xz) - size.xz));

          vec3 c = mix(vec3(0), vec3(1), a);

          gl_FragColor = vec4(c, 1.0);
        }
      `;

var accentFragmentShader = `
    
    varying vec3 vPos;
    uniform vec3 size;
    uniform float thickness;
    uniform float smoothness;
   
    void main() {
            
      float a = smoothstep(thickness, thickness + smoothness, length(abs(vPos.xy) - size.xy));
      a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.yz) - size.yz));
      a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.xz) - size.xz));
      
      vec3 c = mix(vec3(0), vec3(0.0627, 0.9137, 0.9333), a);
      
      gl_FragColor = vec4(c, 1.0);
    }
  `;

var accentFragmentShader2 = `
    
    varying vec3 vPos;
    uniform vec3 size;
    uniform float thickness;
    uniform float smoothness;
   
    void main() {
            
      float a = smoothstep(thickness, thickness + smoothness, length(abs(vPos.xy) - size.xy));
      a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.yz) - size.yz));
      a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.xz) - size.xz));
      
      vec3 c = mix(vec3(0), vec3(1.0000, 0.8549, 0.0003), a);
      
      gl_FragColor = vec4(c, 1.0);
    }
  `;

export {
  vertexShader,
  fragmentShader,
  accentFragmentShader,
  accentFragmentShader2,
};
