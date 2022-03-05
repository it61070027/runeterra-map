import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import {
    CSS2DRenderer,
    CSS2DObject,
} from 'https://unpkg.com/three@0.126.1/examples/jsm/renderers/CSS2DRenderer.js';

// set variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

//set renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas').appendChild(renderer.domElement);

// set labelRenderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.getElementById('canvas').appendChild(labelRenderer.domElement);

//  camera setup
camera.position.z = 3;
scene.add(camera);

// control setup
const controls = new OrbitControls(camera, labelRenderer.domElement);
controls.maxDistance = 5;
controls.minDistance = 0.5;
controls.minAzimuthAngle = -1.44;
controls.maxAzimuthAngle = 1.44;
// map geometryCircleGeometry
const mapGeometry = new THREE.PlaneGeometry(3, 3, 64, 64);

// map material
const mapMaterial = new THREE.MeshStandardMaterial({
    map: THREE.ImageUtils.loadTexture('texture/Runeterra_Terrain_map.jpg'),
    displacementMap: THREE.ImageUtils.loadTexture('texture/Runeterra_Terrain_bump_map.jpg'),
});

// map mesh
const mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);
scene.add(mapMesh);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 640, 640);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

// point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 10);
scene.add(pointLight);

// spinning animation
const animate = () => {
    requestAnimationFrame(animate);
    starMesh.rotation.y -= 0.0005;
    controls.update();
    render();
};

// add Logo Regions
const listRegions = [
    {src: 'texture/Ionia_Crest.png', x: 0.75, y: 0.3, z: 0.2},
    {src: 'texture/Shuriman_Crest.png', x: 0, y: -0.5, z: 0.2},
    {src: 'texture/Shadow_Isles_Crest.png', x: 1.07, y: -0.45, z: 0.2},
    {src: 'texture/Demacia_Crest.png', x: -0.6, y: 0.05, z: 0.2},
    {src: 'texture/Freljord_crest.png', x: -0.5, y: 0.4, z: 0.2},
    {src: 'texture/Ixtal_Crest.png', x: 0.4, y: -0.5, z: 0.2},
    {src: 'texture/Mount_Targon_Crest.png', x: -0.3, y: -0.5, z: 0.2},
    {src: 'texture/Piltover_and_Zaun_Crest.png', x: 0.3, y: -0.2, z: 0.2},
    {src: 'texture/Bilgewater_Crest.png', x: 0.72, y: -0.15, z: 0.2},
    {src: 'texture/Noxus_Crest.png', x: 0, y: 0.2, z: 0.2},
];
const addLogo = (src, x, y, z) => {
    const img = document.createElement('img');
    img.src = src;
    img.style.height = '60px';
    img.style.width = '52.5px';
    const imgLogo = new CSS2DObject(img);
    imgLogo.position.set(x, y, z);
    imgLogo.layers.set(0);
    mapMesh.add(imgLogo);
};
listRegions.forEach(function (item, index) {
    addLogo(item.src, item.x, item.y, item.z);
});

// rendering
const render = () => {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
};

animate();
