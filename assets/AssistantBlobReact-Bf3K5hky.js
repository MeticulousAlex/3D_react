import{R as f,j as e,u as O,r as _}from"./index-6U7pSsbM.js";import{C as R,O as k,u as U,M as $}from"./OrbitControls-CtF8MaGi.js";import{S as q}from"./SectionHead-C1-_oII_.js";const F=`
uniform float u_intensity;
uniform float u_time;
uniform int u_shader_type;

varying vec2 vUv;
varying float vDisplacement;

varying vec3 vPosition;
varying vec3 vNormal;

#define PI 3.1415926535897932384626433832795



vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}







//	Classic Perlin 3D Noise 


float noise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}


/* 
* SMOOTH MOD
* - authored by @charstiles -
* based on https://math.stackexchange.com/questions/2491494/does-there-exist-a-smooth-approximation-of-x-bmod-y
* (axis) input axis to modify
* (amp) amplitude of each edge/tip
* (rad) radius of each edge/tip
* returns => smooth edges
*/


float smoothMod(float axis, float amp, float rad){
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
  return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
}

float wave(vec3 position) {
  return fit(smoothMod(position.y * 6.0, 1.0, 1.5), 0.35, 0.6, 0.0, 1.0);
}




float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

// End of Perlin Noise Code

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;

  if (u_shader_type == 1){
    vDisplacement = snoise(position + vec3(2.0 * u_time));
  } else if (u_shader_type == 2) {
    vec3 noisePattern = vec3(noise(vNormal + vec3(0,(u_time), 0)));
    float pattern = wave(noisePattern);
    vDisplacement = pattern;
  } else if (u_shader_type == 3) {
    vDisplacement = cnoise(position + vec3(2.0 * u_time));
   }


  vec3 newPosition = position + normal * (u_intensity * vDisplacement);

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}




//start 
`,T=`
uniform float u_intensity;
uniform float u_time;
uniform int u_texture_type;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
// this defines our gradient
    vec3 color;
    if (u_texture_type == 1){
        color = vec3(abs( vec2(0.95, 0.65) - 0.5) * 2.0  * (1.0 - distort), 0.35); //last coefficent 1.0 to default color
    } else if (u_texture_type == 2) {
        color = vec3(abs( vUv - 0.5) * 2.0  * (1.0 - distort), 0.27); //last coefficent 1.0 to default color
    } else {
        color = vec3(abs( vUv - 0.5) * 2.0  * (1.0 - distort), 1.0); //last coefficent 1.0 to default color
    }
    gl_FragColor = vec4(color, 1.0);
}

`,g=46;function u(o,n){const a=n*Math.PI/180;return[50+o*Math.sin(a),50-o*Math.cos(a)]}function z(o,n,a){const[r,l]=u(o,n),[s,i]=u(o,a);return`M ${r} ${l} A ${o} ${o} 0 ${Math.abs(a-n)>180?1:0} ${a>n?1:0} ${s} ${i}`}function b({label:o,value:n,min:a,max:r,step:l=1,from:s,to:i,onChange:v}){const p=f.useRef(),y=f.useId(),t=i-s,d=(n-a)/(r-a);function h(c){const x=p.current.getBoundingClientRect();let m=(((Math.atan2(c.clientX-x.left-x.width/2,x.top+x.height/2-c.clientY)*180/Math.PI-(s+t/2))%360+540)%360-180)/t+.5;return(m<0||m>1)&&(m=d<.5?0:1),Math.min(r,Math.max(a,a+Math.round(m*(r-a)/l)*l))}function M(c){c.currentTarget.setPointerCapture(c.pointerId),v(h(c))}function I(c){c.currentTarget.hasPointerCapture(c.pointerId)&&v(h(c))}function S(c){const x={ArrowUp:l,ArrowRight:l,ArrowDown:-l,ArrowLeft:-l}[c.key];x&&(c.preventDefault(),v(Math.min(r,Math.max(a,n+x))))}const P=s+t*d,[C,A]=u(g,P);return e.jsxs("svg",{className:"arc-slider",viewBox:"-8 -8 116 116",ref:p,children:[Array.from({length:11},(c,x)=>{const[w,j]=u(g-2.4,s+t*x/10),[m,D]=u(g-1.4,s+t*x/10);return e.jsx("line",{className:"arc-slider__tick",x1:w,y1:j,x2:m,y2:D},x)}),e.jsx("path",{className:"arc-slider__track",d:z(g,s,i)}),d>0&&e.jsx("path",{className:"arc-slider__fill",d:z(g,s,P)}),e.jsx("path",{id:y,d:z(g+7,Math.min(s,i),Math.max(s,i)),fill:"none"}),e.jsx("text",{className:"arc-slider__label",children:e.jsxs("textPath",{href:`#${y}`,startOffset:"50%",textAnchor:"middle",children:[o," ",e.jsx("tspan",{className:"arc-slider__value",children:n})]})}),e.jsxs("g",{className:"arc-slider__control",role:"slider",tabIndex:0,"aria-label":o,"aria-valuemin":a,"aria-valuemax":r,"aria-valuenow":n,onKeyDown:S,onPointerDown:M,onPointerMove:I,children:[e.jsx("path",{className:"arc-slider__hit",d:z(g,s,i)}),e.jsx("circle",{className:"arc-slider__handle",cx:C,cy:A,r:2.2})]})]})}const N=[{id:1,name:"Simplex"},{id:2,name:"Waves"},{id:3,name:"Perlin"}],E=[{id:1,name:"Peach",className:"swatch_peach"},{id:2,name:"Prism",className:"swatch_prism"},{id:3,name:"Ocean",className:"swatch_ocean"}],G=({speed:o,intensity:n,palette:a,noise:r,onClick:l})=>{const s=_.useRef(),i=_.useRef(!1),v=_.useMemo(()=>({u_intensity:{value:.3},u_time:{value:0},u_shader_type:{value:r},u_texture_type:{value:a}}),[]);return U((p,y)=>{const t=s.current.material.uniforms;t.u_texture_type.value=a,t.u_time.value+=y*o*.01;const d=t.u_shader_type.value!==r,h=d?0:(i.current?n*2.3:n)*.01;t.u_intensity.value=$.lerp(t.u_intensity.value,h,d?.22:.06),d&&t.u_intensity.value<.01&&(t.u_shader_type.value=r)}),e.jsxs("mesh",{ref:s,scale:.73,onPointerOver:()=>{i.current=!0,document.body.style.cursor="pointer"},onPointerOut:()=>{i.current=!1,document.body.style.cursor=""},onClick:l,children:[e.jsx("sphereGeometry",{args:[2.3,128,128]}),e.jsx("shaderMaterial",{fragmentShader:T,vertexShader:F,uniforms:v})]})};function V(){const[o,n]=f.useState(40),[a,r]=f.useState(15),[l,s]=f.useState(1),[i,v]=f.useState(1),[p,y]=O();return e.jsxs("section",{className:"section",id:"shaders",children:[e.jsx(q,{index:"02",eyebrow:"GLSL",title:"Shaders",variant:"gradient",lead:"A sphere displaced on the GPU by noise functions. Drag the arcs, switch the noise and repaint it live."}),e.jsxs("div",{className:"stage shaders",children:[e.jsxs("div",{className:"shaders__viewport",ref:p,children:[e.jsxs(R,{camera:{position:[0,0,5]},dpr:[1,1.5],frameloop:y?"always":"never",children:[e.jsx(G,{speed:o,intensity:a,palette:l,noise:i,onClick:()=>v(i%N.length+1)}),e.jsx(k,{minPolarAngle:Math.PI/2,maxPolarAngle:Math.PI/2,enableZoom:!1})]}),e.jsx(b,{label:"Intensity",value:a,min:10,max:85,from:220,to:320,onChange:r}),e.jsx(b,{label:"Speed",value:o,min:1,max:100,from:140,to:40,onChange:n})]}),e.jsxs("aside",{className:"shaders__side",children:[e.jsxs("div",{className:"panel glass",children:[e.jsx("p",{className:"panel__label",children:"Noise function"}),e.jsx("div",{className:"segmented",children:N.map(t=>e.jsx("button",{className:t.id===i?"segmented__item segmented__item_active":"segmented__item",onClick:()=>v(t.id),children:t.name},t.id))}),e.jsx("p",{className:"panel__label shaders__label",children:"Palette"}),e.jsx("div",{className:"swatches",children:E.map(t=>e.jsxs("button",{className:t.id===l?"swatch swatch_active":"swatch",onClick:()=>s(t.id),children:[e.jsx("span",{className:`swatch__color ${t.className}`}),t.name]},t.id))})]}),e.jsxs("div",{className:"panel glass shaders__explain",children:[e.jsx("p",{className:"panel__label",children:"How it works"}),e.jsx("h3",{className:"panel__title",children:"Vertex shader"}),e.jsx("p",{className:"panel__text",children:"Goes through every point of the sphere and pushes it along its normal by a noise value. That’s what makes the surface breathe."}),e.jsx("h3",{className:"panel__title shaders__subtitle",children:"Fragment shader"}),e.jsx("p",{className:"panel__text",children:"Paints every pixel. Its color depends on the displacement, the time uniform and the chosen palette."})]})]}),e.jsxs("div",{className:"hud hud_tl",children:[e.jsx("span",{className:"hud__live"}),"GPU · 16 641 vertices"]}),e.jsx("div",{className:"hud hud_bl",children:"Click the blob to switch the noise"})]})]})}export{V as default};
