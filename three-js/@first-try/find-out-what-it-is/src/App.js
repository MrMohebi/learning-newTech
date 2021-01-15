import React, {Component} from 'react';
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene;
let camera;
let renderer;
let house;

function __init__THREE(containerDiv) {
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = containerDiv.clientWidth / containerDiv.clientHeight;
  const near = 0.1;
  const far = 400;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 20);

  let ambient = new THREE.AmbientLight(0x404040, 3)
  scene.add(ambient)

  let light = new THREE.DirectionalLight(0x404040,6)
  light.position.set(10,10,10)
  scene.add(light)

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
  renderer.setSize(containerDiv.clientWidth, containerDiv.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio)

  containerDiv.appendChild(renderer.domElement)

  const renderModelGLTF = new GLTFLoader();

  console.log(renderModelGLTF);
  renderModelGLTF.load("./models3d/house/final.glb", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animation()
  })
}

function animation(){
  requestAnimationFrame(animation);
  house.rotation.z += 0.01;
  renderer.render(scene, camera)
}



class App extends Component {
  componentDidMount() {
    __init__THREE(document.querySelector(".main-container-3d"));
  }

  render() {
        return (
            <div className="main-container-3d"/>
        );
    }
}

export default (App);