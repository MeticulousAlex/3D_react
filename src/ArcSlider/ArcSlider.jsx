import './ArcSlider.css';
import React from 'react';

const R = 46;

// point on a circle around (50, 50); angles in degrees, clockwise from 12 o'clock
function polar(r, deg){
    const a = deg * Math.PI / 180;
    return [50 + r * Math.sin(a), 50 - r * Math.cos(a)];
}

function arcPath(r, from, to){
    const [x0, y0] = polar(r, from);
    const [x1, y1] = polar(r, to);
    return `M ${x0} ${y0} A ${r} ${r} 0 ${Math.abs(to - from) > 180 ? 1 : 0} ${to > from ? 1 : 0} ${x1} ${y1}`;
}

// Arc slider laid over a square box: value runs min → max from angle `from` to angle `to`.
export default function ArcSlider({ label, value, min, max, step = 1, from, to, onChange }){
    const svgRef = React.useRef();
    const labelId = React.useId();
    const span = to - from;
    const t = (value - min) / (max - min);

    function valueAt(e){
        const rect = svgRef.current.getBoundingClientRect();
        const angle = Math.atan2(e.clientX - rect.left - rect.width / 2, rect.top + rect.height / 2 - e.clientY) * 180 / Math.PI;
        // angle relative to the arc middle, in (-180, 180]: the wrap point sits opposite the arc
        const rel = (((angle - (from + span / 2)) % 360) + 540) % 360 - 180;
        let next = rel / span + 0.5;
        // past an end: stick to the end the value is already near, never jump to the other one
        if (next < 0 || next > 1) next = t < 0.5 ? 0 : 1;
        return Math.min(max, Math.max(min, min + Math.round(next * (max - min) / step) * step));
    }

    function onPointerDown(e){
        e.currentTarget.setPointerCapture(e.pointerId);
        onChange(valueAt(e));
    }

    function onPointerMove(e){
        if (e.currentTarget.hasPointerCapture(e.pointerId)) onChange(valueAt(e));
    }

    function onKeyDown(e){
        const delta = { ArrowUp: step, ArrowRight: step, ArrowDown: -step, ArrowLeft: -step }[e.key];
        if (!delta) return;
        e.preventDefault();
        onChange(Math.min(max, Math.max(min, value + delta)));
    }

    const current = from + span * t;
    const [hx, hy] = polar(R, current);

    return(
        <svg className='arc-slider' viewBox='-8 -8 116 116' ref={svgRef}>
            {Array.from({ length: 11 }, (_, i) => {
                const [x0, y0] = polar(R - 2.4, from + span * i / 10);
                const [x1, y1] = polar(R - 1.4, from + span * i / 10);
                return <line key={i} className='arc-slider__tick' x1={x0} y1={y0} x2={x1} y2={y1}/>;
            })}
            <path className='arc-slider__track' d={arcPath(R, from, to)}/>
            {t > 0 && <path className='arc-slider__fill' d={arcPath(R, from, current)}/>}

            {/* label runs clockwise on both sides, so its letters always face outwards */}
            <path id={labelId} d={arcPath(R + 7, Math.min(from, to), Math.max(from, to))} fill='none'/>
            <text className='arc-slider__label'>
                <textPath href={`#${labelId}`} startOffset='50%' textAnchor='middle'>
                    {label} <tspan className='arc-slider__value'>{value}</tspan>
                </textPath>
            </text>

            <g
                className='arc-slider__control'
                role='slider'
                tabIndex={0}
                aria-label={label}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
            >
                <path className='arc-slider__hit' d={arcPath(R, from, to)}/>
                <circle className='arc-slider__handle' cx={hx} cy={hy} r={2.2}/>
            </g>
        </svg>
    );
}
