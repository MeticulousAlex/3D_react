import './PrimitiveCarousel.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import PrimitiveMesh from '../PrimitiveMesh/PrimitiveMesh';
import SectionHead from '../SectionHead';
import useInView from '../useInView';
import { optionLimits, primitiveDescriptions } from '../constants';

const PRIMITIVES = [
    { id: 'cube', title: 'Cube', type: 'BoxGeometry', limits: optionLimits.cube, defaults: [3.5, 3.5, 3.5, 8, 8, 8], description: primitiveDescriptions.cube },
    { id: 'sphere', title: 'Sphere', type: 'SphereGeometry', limits: optionLimits.sphere, defaults: [2.5, 32, 32, 0, 2 * Math.PI, 0, Math.PI], description: primitiveDescriptions.sphere },
    { id: 'torus', title: 'Torus', type: 'TorusGeometry', limits: optionLimits.torus, defaults: [2, 0.5, 32, 32, 2 * Math.PI], description: primitiveDescriptions.torus },
    { id: 'cone', title: 'Cone', type: 'ConeGeometry', limits: optionLimits.cone, defaults: [2.5, 2.6, 64, 10, false, 0, 2 * Math.PI], description: primitiveDescriptions.cone },
    { id: 'knot', title: 'Torus Knot', type: 'TorusKnotGeometry', limits: optionLimits.torusKnot, defaults: [1.5, 0.44, 128, 64, 2, 3], description: primitiveDescriptions.knot },
];

const GEOMETRY = {
    cube: (args) => <boxGeometry args={args}/>,
    sphere: (args) => <sphereGeometry args={args}/>,
    torus: (args) => <torusGeometry args={args}/>,
    cone: (args) => <coneGeometry args={args}/>,
    knot: (args) => <torusKnotGeometry args={args}/>,
};

function formatValue(value, limit){
    if (limit.max === 2 * Math.PI) return `${Math.round(value * 180 / Math.PI)}°`;
    return limit.step < 1 ? value.toFixed(2) : value;
}

export default function PrimitiveCarousel(){

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [options, setOptions] = React.useState(() => PRIMITIVES.map((p) => p.defaults));
    const [wireframe, setWireframe] = React.useState(false);
    const [stageRef, inView] = useInView();
    const statsRef = React.useRef({});

    const primitive = PRIMITIVES[activeIndex];
    const values = options[activeIndex];

    function setValue(i, value){
        setOptions(options.map((opts, index) => index === activeIndex ? opts.map((v, j) => j === i ? value : v) : opts));
    }

    function reset(){
        setOptions(options.map((opts, index) => index === activeIndex ? primitive.defaults : opts));
    }

    return(
        <section className='section' id='primitives'>
            <SectionHead
                index='01'
                eyebrow='Geometry'
                title='Primitives'
                lead='Five building blocks every 3D scene starts from. Pick one, bend its parameters and watch the mesh rebuild in real time.'
            />
            <div className='stage primitives' ref={stageRef}>
                <div className='primitives__canvas'>
                    <Canvas dpr={[1, 1.5]} frameloop={inView ? 'always' : 'never'} camera={{ position: [0, 0, 9], fov: 45 }}>
                        <PrimitiveMesh key={primitive.id} geometry={GEOMETRY[primitive.id](values)} wireframe={wireframe} statsRef={statsRef}/>
                    </Canvas>
                </div>

                <div className='primitives__tabs segmented glass'>
                    {PRIMITIVES.map((p, i) => (
                        <button
                            key={p.id}
                            className={i === activeIndex ? 'segmented__item segmented__item_active' : 'segmented__item'}
                            onClick={() => setActiveIndex(i)}
                        >
                            <span className='segmented__index'>0{i + 1}</span>{p.title}
                        </button>
                    ))}
                </div>

                <aside className='primitives__settings panel glass'>
                    <p className='panel__label'>
                        Parameters
                        <button className='link-button' onClick={reset}>Reset</button>
                    </p>
                    <div className='primitives__controls'>
                        {primitive.limits.map((limit, i) => limit.slider ? (
                            <label key={limit.name} className='control'>
                                <span>{limit.name}</span>
                                <output>{formatValue(values[i], limit)}</output>
                                <input
                                    className='range'
                                    type='range'
                                    min={limit.min}
                                    max={limit.max}
                                    step={limit.step}
                                    value={values[i]}
                                    style={{ '--p': `${(values[i] - limit.min) / (limit.max - limit.min) * 100}%` }}
                                    onChange={(e) => setValue(i, Number(e.target.value))}
                                />
                            </label>
                        ) : (
                            <label key={limit.name} className='toggle'>
                                {limit.name}
                                <input type='checkbox' checked={values[i]} onChange={(e) => setValue(i, e.target.checked)}/>
                            </label>
                        ))}
                    </div>
                    <label className='toggle primitives__wireframe'>
                        Wireframe
                        <input type='checkbox' checked={wireframe} onChange={(e) => setWireframe(e.target.checked)}/>
                    </label>
                </aside>

                <aside className='primitives__info panel glass'>
                    <p className='panel__label'>THREE.{primitive.type}</p>
                    <h3 className='panel__title'>{primitive.title}</h3>
                    <p className='panel__text primitives__description'>{primitive.description}</p>
                    <div className='primitives__stats'>
                        <div className='stat'>
                            <b className='stat__value' ref={(el) => statsRef.current.vertices = el}>–</b>
                            <span className='stat__name'>Vertices</span>
                        </div>
                        <div className='stat'>
                            <b className='stat__value' ref={(el) => statsRef.current.triangles = el}>–</b>
                            <span className='stat__name'>Triangles</span>
                        </div>
                    </div>
                </aside>

                <div className='hud hud_tl'><span className='hud__live'/>Real-time mesh</div>
                <div className='hud hud_bc'>Drag to orbit</div>
            </div>
        </section>
    )
}
