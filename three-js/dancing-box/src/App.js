import React, {useRef} from 'react'
import './App.scss';

import {Canvas, useFrame} from "react-three-fiber";


const BoxDancing = ({position, color, args}) =>{
    let refMash = useRef(null);
    useFrame(()=>{refMash.current.rotation.x = refMash.current.rotation.y += 0.01})

    return(
        <mesh position={position} ref={refMash}>
            <boxBufferGeometry attach='geometry' args={args} />
            <meshStandardMaterial attach='material' color={color} />
        </mesh>
    )
}



function App() {
  return (
    <>
      <Canvas colorManagement camera={{position:[-5,10,10], fov:60}}>
          <ambientLight intensity={0.3} />
          <BoxDancing position={[0, 1, 0]} args={[3,2,1]} color={'pink'}/>
          <BoxDancing color={'lightblue'} position={[-2,1,-5]} />
          <BoxDancing color={'lightblue'} position={[5,1,-2]}/>
      </Canvas>
    </>
  );
}

export default App;
