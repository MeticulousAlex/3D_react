import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Center, useBounds } from '@react-three/drei';
import { useDropzone } from 'react-dropzone';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import SectionHead from '../SectionHead';
import './DragAndDrop.css';

function getLoader(filename){
  const name = filename.toLowerCase();
  if (name.endsWith('.gltf') || name.endsWith('.glb')) return new GLTFLoader();
  if (name.endsWith('.fbx')) return new FBXLoader();
  return new OBJLoader();
}

const ModelLoader = ({ file, onLoad, onError }) => {
  const [model, setModel] = useState(null);
  const bounds = useBounds();

  // the model arrives after <Bounds> mounted, so fit the camera once it's in (and centered)
  useEffect(() => {
    if (model) bounds.refresh().clip().fit();
  }, [model]);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    getLoader(file.name).load(url, (loadedModel) => {
      URL.revokeObjectURL(url);
      setModel(loadedModel.scene || loadedModel);
      onLoad();
    }, undefined, () => {
      URL.revokeObjectURL(url);
      onError();
    });
  }, [file]);

  return model ? <Center><primitive object={model}/></Center> : null;
};

function formatSize(bytes){
  return bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.ceil(bytes / 1e3)} KB`;
}

const MAGNIFIER = <svg className='viewer__browse-icon' viewBox='0 0 20 20' aria-hidden='true'><circle cx='8.5' cy='8.5' r='5.5'/><path d='m12.6 12.6 4.4 4.4'/></svg>;

const DragAndDrop = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles[0]) return;
      setFile(acceptedFiles[0]);
      setStatus('loading');
    },
    accept: {
      'model/gltf-binary': ['.glb'],
      'model/gltf+json': ['.gltf'],
      'model/obj': ['.obj'],
      'application/octet-stream': ['.fbx']
    },
    multiple: false,
    // clicks belong to the orbit controls, the file dialog opens from the buttons
    noClick: true,
  });

  function clear(){
    setFile(null);
    setStatus('idle');
  }

  return (
    <section className='section' id='upload'>
      <SectionHead
        index='04'
        eyebrow='Viewer'
        title='Your model'
        lead='Drop a .glb, .gltf, .fbx or .obj file to inspect it here. Nothing is uploaded: the file never leaves your device.'
      />
      <div className={isDragActive ? 'stage viewer viewer_drag' : 'stage viewer'} {...getRootProps()}>
        <input {...getInputProps()} />

        {file && status !== 'error' && (
          <Canvas frameloop="demand" camera={{ position: [0, 1, 6], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={1.6} />
            <directionalLight position={[-6, -2, -4]} intensity={0.8} color='#D8A25E' />
            <Bounds fit clip observe margin={1.3}>
              <ModelLoader key={file.name + file.lastModified} file={file} onLoad={() => setStatus('ready')} onError={() => setStatus('error')}/>
            </Bounds>
            <OrbitControls makeDefault enableZoom={false} />
          </Canvas>
        )}

        {!file && (
          <div className='viewer__empty panel glass'>
            <span className='viewer__icon'>↑</span>
            <p className='viewer__title'>Drag and drop a 3D model</p>
            <p className='viewer__formats'>.glb | .gltf | .fbx | .obj</p>
            <button className='viewer__browse' onClick={open}>Browse files{MAGNIFIER}</button>
          </div>
        )}

        {status === 'loading' && <div className='viewer__status'><span className='hud__live'/>Parsing model</div>}
        {status === 'error' && (
          <div className='viewer__empty panel glass'>
            <p className='viewer__title'>Couldn’t read this file</p>
            <p className='viewer__formats'>It may be corrupted or reference external textures</p>
            <button className='viewer__browse arrow' onClick={open}>Try another file</button>
          </div>
        )}

        {file && (
          <div className='viewer__toolbar glass'>
            <span className='viewer__file'>{file.name}</span>
            <span className='viewer__size'>{formatSize(file.size)}</span>
            <button className='viewer__action' onClick={open}>Replace</button>
            <button className='viewer__action' onClick={clear} aria-label='Clear model'>✕</button>
          </div>
        )}

        {isDragActive && <div className='viewer__drop'>Drop to load</div>}
        <div className='hud hud_tl'>Local viewer</div>
        {status === 'ready' && <div className='hud hud_tr'>Drag to orbit</div>}
      </div>
    </section>
  );
};

export default DragAndDrop;
