import React from 'react';
import './App.css';
import IntroModule from './IntroModule/IntroModule';

// sections below the intro are loaded only after it, so three/r3f/drei stay out of the initial bundle
const TexturesSection = React.lazy(() => import('./AssistantBlobReact/AssistantBlobReact'));
const PrimitiveCarousel = React.lazy(() => import('./PrimitiveCarousel/PrimitiveCarousel'));
const DragAndDrop = React.lazy(() => import('./DragAndDrop/DragAndDrop'));
const Physics = React.lazy(() => import('./Physics/Physcis'));

const SECTIONS = [
  { id: 'primitives', index: '01', label: 'Primitives' },
  { id: 'shaders', index: '02', label: 'Shaders' },
  { id: 'physics', index: '03', label: 'Physics' },
  { id: 'upload', index: '04', label: 'Viewer' },
];

const REPO = 'https://github.com/MeticulousAlex/3D_react';

function Nav() {
  const [active, setActive] = React.useState(null);

  // highlight the section crossing the middle of the viewport
  React.useEffect(() => {
    const onScroll = () => {
      const middle = window.innerHeight / 2;
      const current = SECTIONS.find(({ id }) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top < middle && rect.bottom > middle;
      });
      setActive(current?.id ?? null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className='nav glass'>
      <a className='nav__brand' href='#top'>
        <span className='nav__logo'>3D</span>
        Interactive 3D
      </a>
      <nav className='nav__links'>
        {SECTIONS.map(({ id, index, label }) => (
          <a key={id} href={`#${id}`} className={active === id ? 'nav__link nav__link_active' : 'nav__link'}>
            <span>{index}</span>{label}
          </a>
        ))}
      </nav>
      <a className='nav__cta arrow' href={REPO} target='_blank' rel='noreferrer'>Source</a>
    </header>
  );
}

function App() {
  const [isModuleLoaded, setIsModuleLoaded] = React.useState(false);
  const [isRestShown, setIsRestShown] = React.useState(false);

  // keep the intro pinned until the rest of the page is revealed
  React.useEffect(() => {
    document.documentElement.classList.toggle('is-locked', !isRestShown);
  }, [isRestShown]);

  React.useEffect(() => {
    if (isModuleLoaded) {
      setTimeout(() => {
        setIsRestShown(true);
      }, 2000)
    }
  }, [isModuleLoaded]);

  return (
    <div className="App" id='top'>
      <div className='backdrop' />
      <IntroModule isModuleLoaded={isModuleLoaded} setIsModuleLoaded={setIsModuleLoaded} isCompact={isRestShown}/>
      {isRestShown &&
        <React.Suspense fallback={null}>
          <Nav />
          <main className='main__content'>
            <PrimitiveCarousel/>
            <TexturesSection/>
            <Physics/>
            <DragAndDrop/>
          </main>
          <footer className='footer'>
            <p className='footer__wordmark'>Interactive 3D</p>
            <div className='footer__row'>
              <span>© {new Date().getFullYear()} Aleksandr Smelov</span>
              <span>React · Three.js · React Three Fiber · Spline</span>
              <a className='arrow' href={REPO} target='_blank' rel='noreferrer'>Source on GitHub</a>
            </div>
          </footer>
        </React.Suspense>
      }
    </div>
  );
}
export default App;
