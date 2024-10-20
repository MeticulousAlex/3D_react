import './AssistantBlobReact.css';
import { Canvas, useThree, useFrame} from '@react-three/fiber';
import { MathUtils } from "three";
import { useResizeDetector } from 'react-resize-detector';
import React, { useRef, useMemo } from 'react';
import vertexShaderSimplex from "./vertexShaderSimplex";
import fragmentShader from "./fragmentShader";
// import vertexShaderPerlin from "./vertexShaderPerlin";
// import vertexShaderVoronoi from './vertexShaderVoronoi';

import { OrbitControls } from "@react-three/drei";
import Roundy from 'roundy';

import fragmentShaderText from '../images/FragmentShader_1-cropped.svg';
import vertexShaderText from '../images/vertexShader2.svg';
import closeIcon from '../images/closeIcon.svg';
import blobIcon from '../images/Vector 1.svg';
import colorsIcon from '../images/Group 4.svg'





const SimplexBlob = (props) => {
    
    const meshSimplex = useRef();
    const hover = useRef(false);
    const clicked = useRef(false);

    // const [currentPosition,setCurrentPosition] = React.useState([3 * Math.sin(2*Math.PI), 0, 3 * Math.cos(2*Math.PI)]);
    const [currentShader, setCurrentShader] = React.useState(1);
    const [isShaderChanged, setIsShaderChanged] = React.useState(false);

    function changeShader(){
      setTimeout(()=>{
        switch (currentShader){
          case 1:
            setCurrentShader(2);
            break;
          case 2:
            setCurrentShader(3);
            break;
          default:
            setCurrentShader(1);
        }
        setIsShaderChanged(true);
      }, 200);
    }


    const uniforms = useMemo(
      () => ({
        u_intensity: {
          value: 0.3,
        },
        u_time: {
          value: 0.0,
        },
        u_shader_type:{
          value:1,
        },
        u_texture_type:{
          value:3,
        }
      }),
      []
    );
  
    useFrame((state) => {
      const { clock } = state;

      meshSimplex.current.material.uniforms.u_texture_type.value = props.currentTexture;
      meshSimplex.current.material.uniforms.u_time.value = clock.getElapsedTime() * props.speed * 0.01;
      if (!clicked.current){
        meshSimplex.current.material.uniforms.u_intensity.value = MathUtils.lerp(
          meshSimplex.current.material.uniforms.u_intensity.value,
          hover.current ? props.intensity*2.3* 0.01: props.intensity * 0.01,   //hover.current ? 0.85 : 0.15,
          0.06
        );
      } else {
        meshSimplex.current.material.uniforms.u_shader_type.value = currentShader;
        if (isShaderChanged){
          setIsShaderChanged(false);
          clicked.current = false;
        }
        
        meshSimplex.current.material.uniforms.u_intensity.value = MathUtils.lerp(
          meshSimplex.current.material.uniforms.u_intensity.value,
          0.0,
          0.22
        );
      }
    });
  
    return (
      <mesh
        ref={meshSimplex}
        // position={[3 * Math.sin(2*Math.PI + props.additionalAngle), 0, 3 * Math.cos(2*Math.PI + props.additionalAngle)]}
        position={[0,0,0]}
        scale={0.73}
        onPointerOver={() => (hover.current = true)}
        onPointerOut={() => (hover.current = false)}
        onClick={() =>{
          changeShader();
          clicked.current = true
        }}
        // onPointerDown={()=> (clicked.current = true)}
        // onPointerDown{}
      >
        <sphereGeometry args={[2.3, 256,256]}/>
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShaderSimplex}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    );
  };

  // const PerlinBlob = (props) => {
    
  //   const mesh = useRef();
  //   const hover = useRef(false);

  //   const [currentPosition,setCurrentPosition] = React.useState([3 * Math.sin(4 * Math.PI/3), 0, 3 * Math.cos(4 * Math.PI/3)]);
  
  //   const uniforms = useMemo(
  //     () => ({
  //       u_intensity: {
  //         value: 0.3,
  //       },
  //       u_time: {
  //         value: 0.0,
  //       },
  //     }),
  //     []
  //   );
  
  //   useFrame((state) => {
  //     const { clock } = state;
  //     // if (props.rotation < 0){
  //     //   //setCurrentPosition([3 * Math.sin(4 * Math.PI/3 + additionalAngle + Math.PI/180), 0, 3 * Math.cos(4 * Math.PI/3 + additionalAngle + Math.PI/180)]);
  //     //   props.setAdditionalAngle(additionalAngle+Math.PI/180);
  //     // }
  //     // if (props.rotation > 0){
  //     //  // setCurrentPosition([3 * Math.sin(4 * Math.PI/3 + additionalAngle - Math.PI/180), 0, 3 * Math.cos(4 * Math.PI/3 + additionalAngle - Math.PI/180)]);
  //     //   setAdditionalAngle(additionalAngle-Math.PI/180);
  //     // }
  //     mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
  //     mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
  //       mesh.current.material.uniforms.u_intensity.value,
  //       hover.current ? 0.85 : 0.15,
  //       0.02
  //     );
  //   });
  
  //   return (
  //     <mesh
  //       ref={mesh}
  //       position={[3 * Math.sin(4 * Math.PI/3 + props.additionalAngle), 0, 3 * Math.cos(4 * Math.PI/3 + props.additionalAngle)]}
  //       scale={0.2}
  //       onPointerOver={() => (hover.current = true)}
  //       onPointerOut={() => (hover.current = false)}
  //     >
  //       <sphereGeometry args={[2.3, 128,128]} />
  //       <shaderMaterial
  //         fragmentShader={fragmentShader}
  //         vertexShader={vertexShaderPerlin}
  //         uniforms={uniforms}
  //         wireframe={false}
  //       />
  //     </mesh>
  //   );
  // };

  // const VoronoiBlob = (props) => {
    
  //   const mesh = useRef();
  //   const hover = useRef(false);

  //   const [currentPosition,setCurrentPosition] = React.useState([3 * Math.sin(2 * Math.PI/3), 0, 3 * Math.cos(2 * Math.PI/3)]);
  //   const [additionalAngle, setAdditionalAngle] = React.useState(0);
  
  //   const uniforms = useMemo(
  //     () => ({
  //       u_intensity: {
  //         value: 0.3,
  //       },
  //       u_time: {
  //         value: 0.0,
  //       },
  //     }),
  //     []
  //   );
  
  //   useFrame((state) => {
  //     const { clock } = state;
  //     // if (props.rotation < 0){
  //     //  // setCurrentPosition([3 * Math.sin(2 * Math.PI/3 + additionalAngle + Math.PI/180), 0, 3 * Math.cos(2 * Math.PI/3 + additionalAngle + Math.PI/180)]);
  //     //   setAdditionalAngle(additionalAngle+Math.PI/180);
  //     // }
  //     // if (props.rotation > 0){
  //     //  // setCurrentPosition([3 * Math.sin(2 * Math.PI/3 + additionalAngle - Math.PI/180), 0, 3 * Math.cos(2 * Math.PI/3 + additionalAngle - Math.PI/180)]);
  //     //   setAdditionalAngle(additionalAngle-Math.PI/180);
  //     // }
  //     mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
  //     mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
  //       mesh.current.material.uniforms.u_intensity.value,
  //       hover.current ? 0.85 : 0.15,
  //       0.02
  //     );
  //   });
  
  //   return (
  //     <mesh
  //       ref={mesh}
  //       position={[3 * Math.sin(2 * Math.PI/3 + props.additionalAngle), 0, 3 * Math.cos(2 * Math.PI/3 + props.additionalAngle)]}
  //       rotation={[Math.PI/6,2.5,0]}
  //       scale={0.2}
  //       onPointerOver={() => (hover.current = true)}
  //       onPointerOut={() => (hover.current = false)}
  //     >
  //       <sphereGeometry args={[2.3, 256,256]} />
  //       <shaderMaterial
  //         fragmentShader={fragmentShader}
  //         vertexShader={vertexShaderVoronoi}
  //         uniforms={uniforms}
  //         wireframe={false}
  //       />
  //     </mesh>
  //   );
  // };











export default function TexturesSection(props){
    const [isFragmentSectionOpen, setIsFragmentSectionOpen] = React.useState(false)
    const [isFragmentDataShown, setIsFragmentDataShown] = React.useState(false);
    const [isFragmentIconShown, setIsFragmentIconShown] = React.useState(true)

    const [isVertexSectionOpen, setIsVertexSectionOpen] = React.useState(false)
    const [isVertexDataShown, setIsVertexDataShown] = React.useState(false);
    const [isVertexIconShown, setIsVertexIconShown] = React.useState(true)

    const [currentTexture, setCurrentTexture] = React.useState(1);

    const [rotation,setRotation] = React.useState(0);
    const [additionalAngle, setAdditionalAngle] = React.useState(0);
    const { width = 300, height, ref } = useResizeDetector();
    // const [additionalAngle, setAdditionalAngle] = React.useState(0);

    // if (rotation > 0){
    //   setRotation(rotation - 0.01);
    //   setAdditionalAngle(additionalAngle - 0.01);
    // } else if (rotation <  0){
    //   setRotation(rotation + 0.01);
    //   setAdditionalAngle(additionalAngle + 0.01);
    // }

    const fixedAngle = 40;

    function handleSpeedChange(newSpeed){
        props.setSpeedSlider(newSpeed);
        document.querySelector('.round-slider').speedvalue = newSpeed;
    }

    function handleProcessingChange(newProcessing){
        props.setProcessingSlider(newProcessing);
        document.querySelector('.round-slider').processingvalue = newProcessing;
    }

    // function handleLeft(){
    //     if (rotation < 0){
    //         setRotation(rotation-fixedAngle);
    //     } else if (rotation > 0){
    //         setRotation(-(fixedAngle - (rotation % fixedAngle)));
    //     } else {
    //         setRotation(-fixedAngle);
    //     }
    // }

    // function handleRight(){
    //     if (rotation > 0){
    //         setRotation(rotation + fixedAngle);
    //     } else if (rotation < 0){
    //         setRotation(fixedAngle + (rotation % (-fixedAngle)));
    //     } else {
    //         setRotation(fixedAngle);
    //     }
    // }

    React.useEffect(() => {
      if (isFragmentSectionOpen){
        setIsFragmentIconShown(false);
        setTimeout(() => setIsFragmentDataShown(true), 1000);
      } else {
        setIsFragmentDataShown(false);
        setTimeout(() => setIsFragmentIconShown(true), 1000);
      }
    },[isFragmentSectionOpen])

    React.useEffect(() => {
      if (isVertexSectionOpen){
        setIsVertexIconShown(false);
        setTimeout(() => setIsVertexDataShown(true), 1000);
      } else {
        setIsVertexDataShown(false);
        setTimeout(() => setIsVertexIconShown(true), 1000);
      }
    },[isVertexSectionOpen])

    return(
        <div className='textures-section'>
          <div className='blob'>
            <Canvas camera={{position: [0, 0, 5]}}>
                <SimplexBlob 
                rotation={rotation} 
                setRotation={setRotation} 
                additionalAngle={additionalAngle} 
                setAdditionalAngle={setAdditionalAngle} 
                speed={props.speedSlider} 
                intensity={props.processingSlider}
                currentTexture={currentTexture}
                />
                {/* <PerlinBlob rotation={rotation} additionalAngle={additionalAngle}/>
                <VoronoiBlob rotation={rotation} additionalAngle={additionalAngle}/> */}
                <ambientLight args={[0xff0000]} intensity={0.1} />
                <directionalLight position={[0, 0, 5]} intensity={0.5} />
                <OrbitControls minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2} enableZoom={false}/>
            </Canvas>
            <div ref={ref} className='round-slider' speedvalue={props.speedSlider} spikesvalue={props.spikesSlider} processingvalue={props.processingSlider}>
                  <Roundy className='round-slider_speed' value={props.speedSlider} min={1} max={100} color={'#FF5733'} bgColor={'#7C3C2F'} radius={width/2 * 0.8} arcSize={110} rotationOffset={-55} sliced={false} step={1} strokeWidth={4} thumbSize={1} overrideStyle={'position:absolute; top:50%; left:50%; transform: translateX(-50%) translateY(-50%); .sliderHandle::after{ width:20px; height:10px; right: -9px;}'}  onChange={handleSpeedChange}/>
                  <Roundy className='round-slider_processing' value={props.processingSlider} min={10} max={85} color={'#FF5733'} bgColor={'#7C3C2F'} radius={width/2* 0.8} arcSize={110} rotationOffset={125} sliced={false} step={1} strokeWidth={4} thumbSize={10} overrideStyle={'position:absolute; top:50%; left:50%; transform: translateX(-50%) translateY(-50%);.sliderHandle::after{ width:20px; height:10px; right: -9px;}'} onChange={handleProcessingChange}/>
                  {/* <CircularSlider className='round-slider_amplitude' handle1={{ value: props.processingSlider * 100 || 0.05, onChange: (v) => handleProcessingChange(v) }} minValue={60} maxValue={240} arcColor="orange" startAngle={30} endAngle={150} style={{zIndex: 5}}/> */}
                  {/* <Roundy className='round-slider_processing' value={props.processingSlider * 100 || 0.05} min={60} max={240} color={'orange'} radius={width/2} arcSize={110} rotationOffset={-207}sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'} onChange={handleProcessingChange}/>  */}
            </div>
            <div className='blob__color-selectors'>
              <div 
                className=
                  {currentTexture == 2 
                    ? 'blob__color-selector blob__color-selector_multicolor blob__color-selector_selected' 
                    : 'blob__color-selector blob__color-selector_multicolor'
                  }
                onClick={()=>setCurrentTexture(2)}>
              </div>
              <div 
                className=
                  {currentTexture == 1 
                    ? 'blob__color-selector blob__color-selector_peach blob__color-selector_selected' 
                    : 'blob__color-selector blob__color-selector_peach'
                  }
                onClick={()=>setCurrentTexture(1)}>
              </div>
              <div 
                className=
                  {currentTexture == 3 
                    ? 'blob__color-selector blob__color-selector_sea blob__color-selector_selected' 
                    : 'blob__color-selector blob__color-selector_sea'
                  }
                onClick={()=>setCurrentTexture(3)}>
              </div>
            </div>
          </div>
          <div className={isFragmentSectionOpen ? 'blob-description': 'blob-description blob-description_wrapped'}>
            <img 
              className={isFragmentIconShown ? 'blob-description__spinning-text' : 'blob-description__spinning-text blob-description__spinning-text_hidden'} 
              src={fragmentShaderText} 
              onClick={() => setIsFragmentSectionOpen(!isFragmentSectionOpen)}
            />
            <img
              className={isFragmentIconShown ? 'blob-description__icon' : 'blob-description__icon blob-description__icon_hidden'}
              src={colorsIcon}
            />
            <p 
              className={isFragmentDataShown ? 'blob-description__texture-name' : 'blob-description__texture-name blob-description__texture-name_hidden'}
            >Fragment Shader
            </p>
            <p 
              className={isFragmentDataShown ? 'blob-description__texture-description' : 'blob-description__texture-description blob-description__texture-description_hidden' }
            >Each point of the object has its own color which depends on multiple factors (i.e light, uniforms, textures). <br/><br/> The object will be more lively if its surface contains curvatures enabling the shaders to vary its color or blink the light.
            </p>
            <img 
              className={isFragmentDataShown ? 'blob-description__close-description' : 'blob-description__close-description blob-description__close-description_hidden'}
              src={closeIcon}
              onClick={() => setIsFragmentSectionOpen(false)}
            />
          </div>
          <div className={isVertexSectionOpen ? 'blob-description blob-description_second': 'blob-description blob-description_second blob-description_wrapped'}>
            <img 
              className={isVertexIconShown ? 'blob-description__spinning-text' : 'blob-description__spinning-text blob-description__spinning-text_hidden'} 
              src={vertexShaderText} 
              onClick={() => setIsVertexSectionOpen(!isVertexSectionOpen)}
            />
            <img
              className={isVertexIconShown ? 'blob-description__icon' : 'blob-description__icon blob-description__icon_hidden'}
              src={blobIcon}
            />
            <p 
              className={isVertexDataShown ? 'blob-description__texture-name' : 'blob-description__texture-name blob-description__texture-name_hidden'}
            >Vertex Shader
            </p>
            <p 
              className={isVertexDataShown ? 'blob-description__texture-description' : 'blob-description__texture-description blob-description__texture-description_hidden' }
            > An algorythm goes through the matrix of all points of the object modifying their coordinates according to the rules enboxed into the algorythm.<br/><br/> Looks best with noise algorythms.
            </p>
            <img 
              className={isVertexDataShown ? 'blob-description__close-description' : 'blob-description__close-description blob-description__close-description_hidden'}
              src={closeIcon}
              onClick={() => setIsVertexSectionOpen(false)}
            />
          </div>
            <div className='textures-section__background-circle textures-section__background-circle_one'></div>
            <div className='textures-section__background-circle textures-section__background-circle_two'></div>
            <div className='textures-section__background-circle textures-section__background-circle_three'></div>
            <div className='textures-section__background-circle textures-section__background-circle_four'></div>
            <div className='textures-section__background-circle textures-section__background-circle_five'></div>
            <div className='textures-section__background-circle textures-section__background-circle_small-right-top'></div>
        </div>
    );
}