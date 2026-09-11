import { useEffect, useRef, useState } from 'react';

// true while the element is on (or near) the screen, used to pause offscreen 3D rendering
export default function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
