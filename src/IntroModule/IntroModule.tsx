import Spline from "../PausableSpline"
import React from "react"
import './IntroModule.css'

type Props = {
    isModuleLoaded: boolean
    setIsModuleLoaded: (loaded: boolean) => void
    isCompact: boolean
}

type SplineApp = { setBackgroundColor(color: string): void }

// The scene is published at a fixed pixel scale (not "responsive"), so a small screen just crops it.
// Room its content needs: orbits + SOCIALS/TOOLS (±675px from center) with ~120px of air
// on wide screens, just the orbits on phones (the side labels fall off the edges there, on purpose)
function fit(){
    const [width, height] = window.innerWidth < 768 ? [720, 780] : [1600, 760];
    const scale = Math.min(1, window.innerWidth / width, window.innerHeight / height);
    return { scale, contentHeight: height * scale };
}

// air above and below the scene once the intro shrinks to it
const COMPACT_PADDING = 160;

function IntroModule({ isModuleLoaded, setIsModuleLoaded, isCompact }: Props) {

    const [app, setApp] = React.useState<SplineApp | null>(null);
    const [{ scale, contentHeight }, setFit] = React.useState(fit);
    // true once the intro finished shrinking: then the canvas follows its height,
    // so the Spline watermark in the canvas corner stays on screen
    const [isSettled, setIsSettled] = React.useState(false);

    React.useEffect(() => {
        const onResize = () => setFit(fit());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    function handleLoad(loadedApp: SplineApp){
        // let the page backdrop show through, so the intro has no hard edge against the sections
        loadedApp.setBackgroundColor('rgba(0, 0, 0, 0)');
        setApp(loadedApp);
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement>){
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);

        if (app && Math.abs(dx) < 50 && Math.abs(dy) < 50) {
            setIsModuleLoaded(true);
        }
    }

    return (
        <div
            className='intro'
            onClick={handleClick}
            onTransitionEnd={(e) => e.target === e.currentTarget && e.propertyName === 'height' && setIsSettled(true)}
            style={{
                '--scale': scale,
                // full screen while it's the only thing on the page, then shrink to the scene
                height: isCompact ? `min(100svh, ${contentHeight + COMPACT_PADDING}px)` : undefined,
            } as React.CSSProperties}
        >
            {/* rendered big and scaled down, so the whole scene fits on narrow screens.
                Until the intro settles it's sized off the screen, not the intro, so the canvas
                doesn't resize on every frame of the shrink; either way it stays centered */}
            <div
                className='intro__scene'
                style={isSettled
                    ? { width: `${100 / scale}%`, height: `${100 / scale}%`, top: 0, transform: `scale(${scale})` }
                    : { width: `${100 / scale}%`, height: `calc(100svh / ${scale})`, transform: `translateY(-50svh) scale(${scale})` }}
            >
                <Spline scene="https://draft.spline.design/K-GLGMdNYcQLNCA4/scene.splinecode" scale={scale} onLoad={handleLoad}/>
            </div>
            {!app && (
                <div className='intro__loader'>
                    <span>Loading scene</span>
                    <i />
                </div>
            )}
            {app && !isModuleLoaded && <span className='intro__hint'>Click the core to enter</span>}
        </div>
    )
}

export default IntroModule
