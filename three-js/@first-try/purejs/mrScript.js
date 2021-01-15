
let scene;
let camera
let renderer

function __init__THREE(containerDiv) {
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = containerDiv.clientWidth / containerDiv.clientHeight;
    const near = 0.1;
    const far = 400;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 10, 30);
    camera.rotation.set(0, 20, 0);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    renderer.setSize(containerDiv.clientWidth, containerDiv.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio)

    containerDiv.appendChild(renderer.domElement)

    let renderModelGLTF = new THREE.GLTFLoader();
    renderModelGLTF.load("./models3d/gltf/house/final.glb", function (gltf) {
        scene.add(gltf.scene);
        renderer.render(scene, camera)
    })

}


__init__THREE(document.querySelector(".main-container-3d"));
