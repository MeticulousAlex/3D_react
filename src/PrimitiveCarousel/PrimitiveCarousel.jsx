import './PrimitiveCarousel.css';import React from 'react';

import { Canvas } from '@react-three/fiber';
import { Carousel } from '../Carousel/Carousel';
import PrimitiveMesh from '../PrimitiveMesh/PrimitiveMesh';
import Slider from '@mui/material/Slider';
import { sliderOptions } from '../OptionsSlider/OptionsSlider';
import { optionLimits, primitiveDescriptions } from '../constants';
import settingsIcon from '../images/settings-icon.svg'
import ReactSwitch from 'react-switch';



export default function PrimitiveCarousel(){

    const [active, setActive] = React.useState(0);
    const[previous,setPrevious] = React.useState(-1);
    const [isOptionsOpen, setIsOptionOpen] = React.useState(false);
    const [currentSettings, setCurrentSettings] = React.useState(0);
    const [geometriesOptions, setGeometriesOptions] = React.useState([
        {place:0,
         expanded:true,
         options:[3.5,3.5,3.5, 8, 8, 8],
         optionLimits:optionLimits.cube,
         wireframe:false
        },
        {place:1,
         expanded:false,
         options:[2.5,32,32,0,2*Math.PI,0,Math.PI],
         optionLimits:optionLimits.sphere,
         wireframe:false
        },
        {place:2,
         expanded:false,
         options:[2,0.5,32,32,2*Math.PI],
         optionLimits:optionLimits.torus,
         wireframe:false
        },
        {place:3,
         expanded:false,
         options:[2.5,2.6,64,10,false,0,2*Math.PI],
         optionLimits:optionLimits.cone,
         wireframe:false
        },
        {place:4,
         expanded:false,
         options:[1.5,0.44, 128, 64, 2, 3],
         optionLimits:optionLimits.torusKnot,
         wireframe:false
        },
    ])
    
    const cardsArr = [
        {title: 'Cube', geometry: <boxGeometry args={geometriesOptions[0].options}/>, description: primitiveDescriptions.cube},
        {title: 'Sphere', geometry: <sphereGeometry args={geometriesOptions[1].options} />, description:primitiveDescriptions.sphere},
        {title: 'Torus', geometry: <torusGeometry args={geometriesOptions[2].options}/>, description:primitiveDescriptions.torus},
        {title: 'Cone', geometry: <coneGeometry args={geometriesOptions[3].options}/>, description:primitiveDescriptions.cone},
        {title: 'Torus Knot', geometry: <torusKnotGeometry args={geometriesOptions[4].options}/>, description:primitiveDescriptions.knot}
    ];

    function shuffle(index){
        let currentMax = geometriesOptions[index].place;
        if  (geometriesOptions[index].place !== 0){

            const newOpts = geometriesOptions.map((item,i) => {
                if (i == index){
                    return {...item,place:0}
                } else if (item.place < currentMax){
                    return {...item, place:item.place + 1, expanded:false}
                } else {
                    return item
                }
            })
            setGeometriesOptions(newOpts);
            setPrevious(active);
            setActive(index)

            setTimeout(() => {
                setGeometriesOptions(newOpts.map((item, i) => {
                    if (i == index) {
                        return {...item, expanded: true}
                    } else {
                        return item
                    }
                }))
            }, 350)
        }
    };
    
    const toggleSettings = (index) => {
        if (isOptionsOpen){
            setIsOptionOpen(false);
        } else {
            setIsOptionOpen(true);
            setCurrentSettings(index)
        }

    }

    const changeSetting = (event, newValue) => {
        let index = Number(event.target.name);
        setGeometriesOptions(geometriesOptions.map((item,i) => {
            if (i == currentSettings){
                return {...item, options: item.options.map((item,i) => {
                    if (i == index){
                        return newValue
                    }else {
                        return item
                    }

                })}
            }

            return item
        }))
    }

    const changeRadioSetting = (checked, event, id) => {
        let index = Number(id);
        setGeometriesOptions(geometriesOptions.map((item,i) => {
            if (i == currentSettings){
                return {...item, options: item.options.map((item,i) => {
                    if (i == index){
                        return checked
                    }else {
                        return item
                    }

                })}
            }

            return item
        }))
    }

    const toggleWireframe = (value) => {
        console.log(value);
        setGeometriesOptions(geometriesOptions.map((opt,i) => {
            if (i == currentSettings){
                return {...opt, wireframe: value}
            } else {
                return opt
            }
        }))
        
    }

    return(
            <div className='primitives'>
                <h2 className='primitives__title title'>PRIMITIVES</h2>
                <ul className='primitives__list'> { /*style={{height: `calc( 100% )`}} ${geometriesOptions.length * 90 + 150}*/}
                    {cardsArr.map((card, i) => {
                        return(
                        <li key={i} className='primitives__list-item' style={{
                            top: `calc(${geometriesOptions[i].place} * calc((100% - 40%) / ${geometriesOptions.length}) + 20%)`,
                             zIndex: geometriesOptions[i].place == 0 ? 2 : 1,
                             width:geometriesOptions[i].expanded ? 'calc(100% + 70px)' : '100%',
                            //   width:geometriesOptions[i].expanded ? '130%' : '100%',
                              height:`calc((100% - 40%) / ${geometriesOptions.length} - 1%)`}}>
                            <button
                                className={geometriesOptions[i].expanded ? 'primitives__list-item-name primitives__list-item-name_expanded' : 'primitives__list-item-name'}
                                onClick={() => shuffle(i)}
                                >
                                    {card.title}
                            </button>
                            <div className={geometriesOptions[i].expanded ? 'primitives__settings-container primitives__settings-container_expanded' : 'primitives__settings-container'}>
                                <img className='primitives__settings-button' src={settingsIcon} onClick={() => toggleSettings(i)}></img>
                            </div>
                        </li>
                        ) 
                    })}
                    <div className='primitives__primitive-options' style={{
                        height: `calc(${geometriesOptions.length - 1} * calc((100% - 40%) / ${geometriesOptions.length}) - 0.5%)`,
                        left: isOptionsOpen ? 0 : 'calc((100% + 70px) * -1)',
                        top: `calc(20% + (100% - 40%) / ${geometriesOptions.length})`
                    }}>
                        <ul className='primitives__primitive-options-list'>
                            {geometriesOptions[currentSettings].options.map((option,i) => {
                                if (geometriesOptions[currentSettings].optionLimits[i].slider){
                                    return(
                                        <li key={i}className='primitives__primitive-options-item'>
                                            <p className='primitives__primitive-options-item-name'>{geometriesOptions[currentSettings].optionLimits[i].name}</p>
                                            <Slider
                                                sx={sliderOptions}
                                                name={i.toString()}
                                                aria-label={i.toString()}
                                                value={option}
                                                onChange={changeSetting}
                                                min={geometriesOptions[currentSettings].optionLimits[i].min}
                                                max={geometriesOptions[currentSettings].optionLimits[i].max}
                                                step={geometriesOptions[currentSettings].optionLimits[i].step}
                                            />
                                        </li>
                                    )
                                } else {
                                    return(
                                        <li key={i} className='primitives__primitive-options-item'>
                                            <p className='primitives__primitive-options-item-name'>{geometriesOptions[currentSettings].optionLimits[i].name}</p>
                                            <ReactSwitch className='primitives__primitive-options-switch' id={i.toString()} onChange={changeRadioSetting} checked={option} width={45} height={20} offColor='#ff5733' onColor='#ff5733' activeBoxShadow='0'/>
                                        </li>
                                        
                                    )
                                }
                            })}
                        </ul>
                        <div className='primitives__wireframe-switch'>
                            <p className='primitives__wireframe-switch-title'>Wireframe</p>
                            <label className='toggle-switch' style={{ background:'#000000' }}>
                                <input  
                                    className='toggle-switch__input'
                                    checked={geometriesOptions[currentSettings].wireframe}
                                    onChange={() => toggleWireframe(!geometriesOptions[currentSettings].wireframe)}
                                    type="checkbox"
                                />
                                <div className='toggle-switch__button' style={!geometriesOptions[currentSettings].wireframe ? {left: 'calc(100% - 2px)', transform: 'translateX(-100%)'} : {}} />
                                <div className='toggle-switch__labels'>
                                    <span className='toggle-switch__span toggle-switch__span_left' style={geometriesOptions[currentSettings].wireframe ? {color:'black'} : {}}>Shown</span>
                                    <span className='toggle-switch__span toggle-switch__span_right' style={!geometriesOptions[currentSettings].wireframe ? {color:'black'} : {}}>Hidden</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </ul>
                
                <div className='primitives__primitive-projection'>
                    <Carousel active={active}>

                        {cardsArr.map((card,i) => {


                                return(
                                    <div key={i} className='carousel__card'>             
                                        <div className='carousel__image'>
                                            <Canvas>
                                                {active == i || previous == i ? <PrimitiveMesh mesh={card} wireframe={geometriesOptions[i].wireframe} previous={i == previous} active={i == active}/> : <></>}
                                            </Canvas>
                                        </div> 
                                    </div>
                                )

                        })}
                    </Carousel>
                </div>

                <div className='primitives__primitive-description-wrapper'>
                        <div className='primitives__primitive-description-container glass'>
                            <h3 className='primitives__primitive-description-title'>{cardsArr[active].title}</h3>
                            <p className='primitives__primitive-description-about'>{cardsArr[active].description}</p>
                        </div>
                </div>
                <div className='primitives__background-circle primitives__background-circle_purple'></div>
                <div className='primitives__background-circle primitives__background-circle_green'></div>
                <div className='primitives__background-circle primitives__background-circle_yellow'></div>
                <div className='primitives__background-circle primitives__background-circle_white'></div>
                <div className='primitives__background-circle primitives__background-circle_lime'></div>
                <div className='primitives__background-circle primitives__background-circle_blue'></div>
                <div className='primitives__background-circle primitives__background-circle_small-left-bottom'></div>
                <div className='primitives__background-circle primitives__background-circle_small-right-top'></div>
                <div className='primitives__background-circle primitives__background-circle_central'></div>
            </div>

    )
}