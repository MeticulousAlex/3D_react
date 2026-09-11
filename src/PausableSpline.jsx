import React from 'react';
import Spline from '@splinetool/react-spline';
import useInView from './useInView';

// Spline keeps rendering offscreen by default, so skip drawing while the scene isn't visible.
// Not app.stop(): it also pauses scene events/timelines, and they come back broken after play().
// renderMode 'manual' only skips the GPU work, the event loop and clock keep running.
//
// `scale` is for scenes rendered at 1/scale size and shrunk by CSS to fit a small box
// (our scenes are published at a fixed pixel scale, so otherwise they just get cropped).
export default function PausableSpline({ onLoad, scale = 1, ...props }) {
  const [ref, inView] = useInView();
  const [app, setApp] = React.useState(null);
  const basePixelRatio = React.useRef(1);

  React.useEffect(() => {
    if (app) app.renderMode = inView ? 'auto' : 'manual';
  }, [app, inView]);

  // drop the pixel ratio by the same factor as the CSS shrink, so the GPU keeps drawing
  // the screen's real resolution instead of 1/scale² times more
  // ponytail: _renderer/_resize are private runtime API (pinned in the lockfile); if they go away the scene still fits, just costs more
  React.useEffect(() => {
    if (!app?._renderer) return;
    app._renderer.setPixelRatio(basePixelRatio.current * scale);
    // Spline's own forced resize: its setSize skips same-size calls, so buffers keep the old ratio otherwise
    app._resize?.(true);
  }, [app, scale]);

  return (
    <Spline
      ref={ref}
      {...props}
      onLoad={(loadedApp) => {
        basePixelRatio.current = loadedApp._renderer?.getPixelRatio() ?? 1;
        setApp(loadedApp);
        onLoad?.(loadedApp);
      }}
    />
  );
}
