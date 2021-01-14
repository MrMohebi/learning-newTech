import React, {Component} from 'react';
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function __init__THREE(containerDiv) {
  let scene = new THREE.Scene();

  const fov = 35;
  const aspect = containerDiv.clientWidth / containerDiv.clientHeight;
  const near = 0.1;
  const far = 400;

  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 10, 30);
  camera.rotation.set(0, 20, 0);

  let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
  renderer.setSize(containerDiv.clientWidth, containerDiv.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio)

  containerDiv.appendChild(renderer.domElement)

  const renderModelGLTF = new GLTFLoader();
  console.log(renderModelGLTF);
  renderModelGLTF.load("./models3d/house/scene.gltf", function (gltf) {
    console.log(gltf);
    scene.add(gltf.scene);
  })

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