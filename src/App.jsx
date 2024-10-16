import React from 'react';
import Spline from '@splinetool/react-spline';
// import Assistant from './AssistantBlob/AssistantBlob';
import './App.css';
import TexturesSection from './AssistantBlobReact/AssistantBlobReact';
import PrimitiveCarousel from './PrimitiveCarousel/PrimitiveCarousel';
// import { Renderer } from 'three/webgpu';

function App() {

//AssistantBlob temp
const [speedSlider, setSpeedSlider] = React.useState(40);
const [spikesSlider, setSpikesSlider] = React.useState(15);
const [processingSlider, setProcessingSlider] = React.useState(15);
const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
const [isAnimationOver, setIsAnimationOver] = React.useState(false);

  React.useEffect(() => {
  
    localStorage.setItem('variable_144ebfe4-de0d-4dae-9d86-aa2411cfa302', 'false');
    checkLocalStorage();
    window.addEventListener('storage', () => {
      const res = localStorage.getItem('variable_144ebfe4-de0d-4dae-9d86-aa2411cfa302');
      console.log(res);
      setIsAnimationOver(res);
    });
    return;
  },[])


  async function checkLocalStorage(){
    if (!isAnimationOver){
      const res = JSON.parse(localStorage.getItem('variable_144ebfe4-de0d-4dae-9d86-aa2411cfa302'));
      if (res){setIsAnimationOver(res)}
      else{
        setTimeout(checkLocalStorage,1000);
      }
    }
  }

  return (
    
    <div className="App"> 
      
      {/* <p style={{color: 'white'}}>{isAnimationOver}</p> */}
      <Spline scene="https://draft.spline.design/uCFvIdqD0zv2ZR5v/scene.splinecode"/>
      {/* <Renderer isAnimationOver={isAnimationOver} setIsAnimationOver={setIsAnimationOver}/> */}
      {/* <Assistant speedSlider={speedSlider} setSpeedSlider={setSpeedSlider} spikesSlider={spikesSlider} setSpikesSlider={setSpikesSlider} processingSlider={processingSlider} setProcessingSlider={setProcessingSlider} type='simplex' screenWidth={screenWidth} setScreenWidth={setScreenWidth}/> */}
          <div className='main__content'> 
            <PrimitiveCarousel/>
            <TexturesSection
              speedSlider={speedSlider}
              setSpeedSlider={setSpeedSlider} 
              spikesSlider={spikesSlider} 
              setSpikesSlider={setSpikesSlider} 
              processingSlider={processingSlider} 
              setProcessingSlider={setProcessingSlider} 
              type='simplex' screenWidth={screenWidth} 
              setScreenWidth={setScreenWidth}
            />
            {/* <Spline scene="https://prod.spline.design/pC37xQZlb9pMWC5W/scene.splinecode"/> */}
          </div>
    </div>
    
  );
}
export default App;
