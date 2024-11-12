import React from 'react';
import Spline from '@splinetool/react-spline';
// import Assistant from './AssistantBlob/AssistantBlob';
import './App.css';
import TexturesSection from './AssistantBlobReact/AssistantBlobReact';
import PrimitiveCarousel from './PrimitiveCarousel/PrimitiveCarousel';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import Physics from './Physics/Physcis';

function App() {

const [speedSlider, setSpeedSlider] = React.useState(40);
const [spikesSlider, setSpikesSlider] = React.useState(15);
const [processingSlider, setProcessingSlider] = React.useState(15);
const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  return (
    
    <div className="App"> 
      
      <Spline scene="https://draft.spline.design/K-GLGMdNYcQLNCA4/scene.splinecode"/>
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
            <Physics/>
            <DragAndDrop/>
          </div>
    </div>
    
  );
}
export default App;
