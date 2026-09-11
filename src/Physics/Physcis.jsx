import './Physics.css';
import React from 'react';
import Spline from '../PausableSpline';
import SectionHead from '../SectionHead';

// room the cube pyramid needs (~590×490 px at full scale) plus some air;
// the scene has a fixed pixel scale, so a smaller stage would just crop it
const CONTENT_WIDTH = 720;
const CONTENT_HEIGHT = 600;

export default function Physics(){
    const stageRef = React.useRef();
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setScale(Math.round(Math.min(1, width / CONTENT_WIDTH, height / CONTENT_HEIGHT) * 100) / 100);
        });
        observer.observe(stageRef.current);
        return () => observer.disconnect();
    }, []);

    return(
        <section className='section' id='physics'>
            <SectionHead
                index='03'
                eyebrow='Simulation'
                title='Physics'
                variant='outline'
                lead='Rigid bodies with gravity, mass and collisions, solved in real time right in the browser.'
            />
            <div className='stage physics' ref={stageRef}>
                {/* rendered at 1/scale size and shrunk, so the whole scene fits a narrow stage */}
                <div className='physics__scene' style={{ width: `${100 / scale}%`, height: `${100 / scale}%`, transform: `scale(${scale})` }}>
                    <Spline scene="https://draft.spline.design/xnnhqlj17MtYyxyR/scene.splinecode" scale={scale}/>
                </div>
                <div className='hud hud_tl'><span className='hud__live'/>Rigid body · live</div>
                <div className='hud hud_bl'>Interact with the scene</div>
            </div>
        </section>
    )
}
