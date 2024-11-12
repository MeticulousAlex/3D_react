import './Physics.css';
import Spline from '@splinetool/react-spline';

export default function Physics(){

    return(
        <div className='physics'>
              <h2 className='physics__title title'>PHYSICS</h2>
              <div className='physics__container'>
                <Spline scene="https://draft.spline.design/xnnhqlj17MtYyxyR/scene.splinecode"/>
                
              </div>
              <div className='physics__background-circle physics__background-circle_purple'></div>
                <div className='physics__background-circle physics__background-circle_yellow'></div>
                <div className='physics__background-circle physics__background-circle_white'></div>
                <div className='physics__background-circle physics__background-circle_lime'></div>
                <div className='physics__background-circle physics__background-circle_blue'></div>
                <div className='physics__background-circle physics__background-circle_small-left-bottom'></div>
            </div>
    )
}