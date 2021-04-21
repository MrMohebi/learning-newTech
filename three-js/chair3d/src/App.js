import React, {Suspense, useRef, useEffect} from "react";
import "./App.scss";

//Components
import Header from "./components/header";
import {Section} from "./components/section";
import {Canvas, useFrame} from "react-three-fiber";
import {Html, useGLTFLoader} from "drei";
import {useInView} from "react-intersection-observer";

import state from './components/state'

const Model = ({modelPath}) =>{
    const gltf = useGLTFLoader(modelPath, true)
    return(<primitive object={gltf.scene} dispuse={null}/>)
}

const Light = () =>{
    return(
        <>
            <ambientLight intensity={0.3}/>
            <directionalLight position={[10,10,15]} intensity={1}/>
            <directionalLight position={[0, 10, 0]} intensity={1.5}/>
        </>
    )
}


const HTMLContent = ({ domContent, children, modelPath, bgColor, positionY}) =>{
    const ref = useRef()
    useFrame(()=>{ref.current['rotation'].y += 0.01})

    const [refItem, inView] = useInView({threshold:0})
    useEffect(()=> {
        inView && (document.body.style.background = bgColor)
    })

    return(
        <Section factor={1.5} offset={1}>
            <group position={[0,positionY,0]}>
                <mesh ref={ref} position={[0,-35,0]}>
                    <Model modelPath={modelPath}/>
                </mesh>

                <Html portal={domContent} fullscreen>
                    <div ref={refItem} className="container">{children}</div>
                </Html>

            </group>
        </Section>
    )
}


export default function App() {
    const domContent = useRef()
    const scrollArea = useRef()
    const onScroll = (e)=> (state.top.current = e.target.scrollTop)
    useEffect(()=>void onScroll({target: scrollArea.current}), [])
  return (
    <>
      <Header />
      <Canvas colorManagement camera={{position: [0, 0, 120], fov:70}}>
          <Light/>
          <Suspense fallback={null}>
              <HTMLContent domContent={domContent} modelPath='/my3ds/chair/scene.gltf' positionY={250} bgColor={'#ffd025'}>
                  <h1 className="title">Yellow</h1>
              </HTMLContent>
              <HTMLContent domContent={domContent} modelPath='/armchairGray.gltf' positionY={0} bgColor={'#534d3a'}>
                  <h1 className="title">Gray</h1>
              </HTMLContent>
              <HTMLContent domContent={domContent} modelPath='/armchairGreen.gltf' positionY={-250} bgColor={'#54ff25'}>
                  <h1 className="title">Green</h1>
              </HTMLContent>
          </Suspense>
      </Canvas>

        <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
            <div style={{position:"sticky", top:0}} ref={domContent}/>
            <div style={{height: `${state.sections * 100}vh`}}/>
        </div>
    </>
  );
}
