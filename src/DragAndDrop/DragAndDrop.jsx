import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { useDropzone } from 'react-dropzone';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './DragAndDrop.css';
import closeIcon from '../images/closeIcon.svg';

const ModelLoader = ({ file }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (file) {
      const loader = getLoader(file.name);
      loader.load(URL.createObjectURL(file), (loadedModel) => {
        setModel(loadedModel);
      });
    }
  }, [file]);

  const getLoader = (filename) => {
    if (filename.endsWith('.gltf') || filename.endsWith('.glb')) {
      return new GLTFLoader();
    } else if (filename.endsWith('.fbx')) {
      return new FBXLoader();
    } else if (filename.endsWith('.obj')) {
      return new OBJLoader();
    }
    return null;
  };

  return model ? (
    <primitive object={model.scene || model} scale={1.25} />
  ) : null;
};

const DragAndDrop = () => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const clearFile = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.glb,.fbx,.obj,.gltf',
    multiple: false,
  });

  return (
    <div className="drag-and-drop">
      <h2 className='drag-and-drop__title title'>MODEL UPLOAD</h2>
      {!file && (
        <div className="drag-and-drop__dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p className="drag-and-drop__text">Drag and drop a 3D model here <br></br>(.glb, .fbx, .obj, .gltf)</p>
        </div>
      )}

      

      <div className='drag-and-drop__canvas-container'>
          <button className={file ? "drag-and-drop__clear-button drag-and-drop__clear-button_shown" : "drag-and-drop__clear-button" } onClick={clearFile}>
            <img className='drag-and-drop__close-icon' src={closeIcon}/>
          </button>
        <div className={file ? "drag-and-drop__canvas drag-and-drop__canvas_shown" : "drag-and-drop__canvas"}>
        <Canvas >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} intensity={500} />
          {file && <ModelLoader file={file} />}
          <OrbitControls enableZoom={false} />
          <Loader />
        </Canvas>
        </div>
      </div>


      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_purple'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_green'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_yellow'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_magenta'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_white'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_lime'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_blue'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_small-left-bottom'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_small-right-top'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_small-right-top-second'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_small-right-top-third'></div>
      <div className='drag-and-drop__background-circle drag-and-drop__background-circle_central'></div>

    </div>
  );
};

export default DragAndDrop;