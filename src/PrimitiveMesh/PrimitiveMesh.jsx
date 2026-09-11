import React from "react";
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function PrimitiveMesh({ geometry, wireframe, statsRef }){

    const myMesh = React.useRef();
    const scale = React.useRef(0);
    const lastGeometry = React.useRef(null);

    useFrame(({ clock }) => {
        const mesh = myMesh.current;
        mesh.rotation.y = clock.getElapsedTime() / 18;
        mesh.rotation.x = Math.PI / 6;

        // pop in on mount
        scale.current += (1 - scale.current) * 0.08;
        mesh.scale.setScalar(scale.current);

        // live vertex/triangle count, written straight to the DOM to skip React renders
        const g = mesh.geometry;
        if (g !== lastGeometry.current && statsRef.current.vertices) {
            lastGeometry.current = g;
            const vertices = g.attributes.position.count;
            statsRef.current.vertices.textContent = vertices.toLocaleString('en-US');
            statsRef.current.triangles.textContent = ((g.index ? g.index.count : vertices) / 3).toLocaleString('en-US');
        }
    });

    return(
        <>
            <mesh ref={myMesh}>
                {geometry}
                <meshStandardMaterial wireframe={wireframe} color='#f4f1ec' roughness={0.35} metalness={0.15}/>
            </mesh>
            <ambientLight intensity={0.35}/>
            <directionalLight position={[-5, -5, -5]} intensity={0.8} color='#D8A25E' />
            <directionalLight position={[5, 5, 5]} intensity={0.6} color='#A04747' />
            <pointLight position={[0, 3, -4]} intensity={25} color='#FF5733' />
            <OrbitControls enableZoom={false}/>
        </>
    )
}
