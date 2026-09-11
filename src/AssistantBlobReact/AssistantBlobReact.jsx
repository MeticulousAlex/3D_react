import './AssistantBlobReact.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from "three";
import React, { useRef, useMemo } from 'react';
import { OrbitControls } from "@react-three/drei";
import vertexShaderSimplex from "./vertexShaderSimplex";
import fragmentShader from "./fragmentShader";
import ArcSlider from '../ArcSlider/ArcSlider';
import SectionHead from '../SectionHead';
import useInView from '../useInView';

const NOISES = [
  { id: 1, name: 'Simplex' },
  { id: 2, name: 'Waves' },
  { id: 3, name: 'Perlin' },
];

const PALETTES = [
  { id: 1, name: 'Peach', className: 'swatch_peach' },
  { id: 2, name: 'Prism', className: 'swatch_prism' },
  { id: 3, name: 'Ocean', className: 'swatch_ocean' },
];

const Blob = ({ speed, intensity, palette, noise, onClick }) => {
  const mesh = useRef();
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: { value: 0.3 },
      u_time: { value: 0.0 },
      u_shader_type: { value: noise },
      u_texture_type: { value: palette },
    }),
    []
  );

  useFrame((_, delta) => {
    const u = mesh.current.material.uniforms;
    u.u_texture_type.value = palette;
    // accumulate time so changing the speed doesn't jump the animation
    u.u_time.value += delta * speed * 0.01;

    // on noise change: flatten the blob, swap the noise at zero, then grow back
    const switching = u.u_shader_type.value !== noise;
    const target = switching ? 0 : (hover.current ? intensity * 2.3 : intensity) * 0.01;
    u.u_intensity.value = MathUtils.lerp(u.u_intensity.value, target, switching ? 0.22 : 0.06);
    if (switching && u.u_intensity.value < 0.01) u.u_shader_type.value = noise;
  });

  return (
    <mesh
      ref={mesh}
      scale={0.73}
      onPointerOver={() => {
        hover.current = true;
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        hover.current = false;
        document.body.style.cursor = '';
      }}
      onClick={onClick}
    >
      <sphereGeometry args={[2.3, 128, 128]}/>
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShaderSimplex}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function TexturesSection(){
  const [speed, setSpeed] = React.useState(40);
  const [intensity, setIntensity] = React.useState(15);
  const [palette, setPalette] = React.useState(1);
  const [noise, setNoise] = React.useState(1);
  const [viewportRef, inView] = useInView();

  return(
    <section className='section' id='shaders'>
      <SectionHead
        index='02'
        eyebrow='GLSL'
        title='Shaders'
        variant='gradient'
        lead='A sphere displaced on the GPU by noise functions. Drag the arcs, switch the noise and repaint it live.'
      />
      <div className='stage shaders'>
        <div className='shaders__viewport' ref={viewportRef}>
          <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]} frameloop={inView ? 'always' : 'never'}>
            <Blob
              speed={speed}
              intensity={intensity}
              palette={palette}
              noise={noise}
              onClick={() => setNoise(noise % NOISES.length + 1)}
            />
            <OrbitControls minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2} enableZoom={false}/>
          </Canvas>
          <ArcSlider label='Intensity' value={intensity} min={10} max={85} from={220} to={320} onChange={setIntensity}/>
          <ArcSlider label='Speed' value={speed} min={1} max={100} from={140} to={40} onChange={setSpeed}/>
        </div>

        <aside className='shaders__side'>
          <div className='panel glass'>
            <p className='panel__label'>Noise function</p>
            <div className='segmented'>
              {NOISES.map((n) => (
                <button
                  key={n.id}
                  className={n.id === noise ? 'segmented__item segmented__item_active' : 'segmented__item'}
                  onClick={() => setNoise(n.id)}
                >
                  {n.name}
                </button>
              ))}
            </div>
            <p className='panel__label shaders__label'>Palette</p>
            <div className='swatches'>
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  className={p.id === palette ? 'swatch swatch_active' : 'swatch'}
                  onClick={() => setPalette(p.id)}
                >
                  <span className={`swatch__color ${p.className}`}/>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className='panel glass shaders__explain'>
            <p className='panel__label'>How it works</p>
            <h3 className='panel__title'>Vertex shader</h3>
            <p className='panel__text'>Goes through every point of the sphere and pushes it along its normal by a noise value. That’s what makes the surface breathe.</p>
            <h3 className='panel__title shaders__subtitle'>Fragment shader</h3>
            <p className='panel__text'>Paints every pixel. Its color depends on the displacement, the time uniform and the chosen palette.</p>
          </div>
        </aside>

        <div className='hud hud_tl'><span className='hud__live'/>GPU · 16 641 vertices</div>
        <div className='hud hud_bl'>Click the blob to switch the noise</div>
      </div>
    </section>
  );
}
