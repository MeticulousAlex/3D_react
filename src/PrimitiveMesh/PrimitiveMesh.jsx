import React from "react";
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function PrimitiveMesh({mesh, wireframe}){

    const myMesh = React.useRef();

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()/3;
        myMesh.current.rotation.y = a/6;
        myMesh.current.rotation.x = Math.PI/6;
    });

    return(
        <>
            <mesh ref={myMesh} position={[0,0,0]}>
                {mesh.geometry}
                <meshStandardMaterial wireframe={wireframe} color={'white'}/> 
            </mesh>
            <ambientLight args={[0xFFFFFF]} intensity={0.35}/>
            <directionalLight position={[-5, -5, -5]} intensity={0.8} color={'#D8A25E'} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} color={'#A04747'} />
            <OrbitControls enableZoom={false}/>
        </>
    )
}