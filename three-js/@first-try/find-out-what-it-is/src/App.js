import React, {Component} from 'react';
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, controls;

let matilda;

function __init__THREE(containerDiv) {
  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd)

  scene.add(new THREE.AxesHelper(800))


  // create camera
  const fov = 35;
  const aspect = containerDiv.clientWidth / containerDiv.clientHeight;
  const near = 0.1;
  const far = 4000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 100, 500);

  // create lights
  let ambient = new THREE.AmbientLight(0x404040, 3)
  scene.add(ambient)
  let light = new THREE.DirectionalLight(0x404040,6)
  light.position.set(10,10,10)
  scene.add(light)


  // create renderer
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
  renderer.setSize(containerDiv.clientWidth, containerDiv.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  containerDiv.appendChild(renderer.domElement)

  // import model
  const renderModelGLTF = new GLTFLoader();
  renderModelGLTF.load("./models3d/glb/matilda/matilda.glb", function (gltf) {
    scene.add(gltf.scene);
    matilda = gltf.scene.children[0];
    matilda.position.set(0,-120,0)
  })

  // controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer)


  animation()
}

function animation(){
  renderer.render(scene, camera)
  requestAnimationFrame(animation);
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