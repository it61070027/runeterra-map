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
    {
        src: 'texture/Ionia_Crest.png',
        x: 0.75,
        y: 0.3,
        z: 0.2,
        header: 'IONIA',
        subHead: 'THE FIRST LANDS',
        text: 'Known as the First Lands, Ionia is an island continent of natural beauty and magic. Its inhabitants, living in loosely collected provinces, are a spiritual people, seeking harmony with the world. They remained largely neutral until their land was invaded by Noxus—this brutal occupation forced Ionia to reassess its place in the world, and its future path remains undetermined.',
    },
    {
        src: 'texture/Shuriman_Crest.png',
        x: 0,
        y: -0.5,
        z: 0.2,
        header: 'SHURIMA',
        subHead: 'FALLEN DESERT EMPIRE',
        text: 'Shurima was once a thriving civilization that spanned the southern continent, left in ruins by the fall of its god-emperor. Over millennia, tales of its former glory became myth and ritual. Now, its nomadic inhabitants eke out a life in the deserts, or turn to mercenary work. Still, some dare to dream of a return to the old ways.',
    },
    {
        src: 'texture/Shadow_Isles_Crest.png',
        x: 1.07,
        y: -0.45,
        z: 0.2,
        header: 'SHADOW ISLES',
        subHead: 'LANDS SHROUDED BY THE BLACK MIST',
        text: 'The Shadow Isles were once a beautiful realm, long since shattered by a magical cataclysm. Now, Black Mist permanently shrouds the land, tainting and corrupting with its malevolent sorcery. Those who perish within it are condemned to become part of it for all eternity… and worse still, each year the Mist extends its grasp to reap more souls across Runeterra.',
    },
    {
        src: 'texture/Demacia_Crest.png',
        x: -0.6,
        y: 0.05,
        z: 0.2,
        header: 'DEMACIA',
        subHead: 'PROUD MILITARY KINGDOM',
        text: 'Demacia is a proud, lawful kingdom with a prestigious military history. Founded as a refuge from magic after the Rune Wars, some might suggest that the golden age of Demacia has passed, unless it proves able to adapt to a changing world. Self-sufficient and agrarian, its society is inherently defensive and insular, valuing justice, honor, and duty above all else.',
    },
    {
        src: 'texture/Freljord_crest.png',
        x: -0.5,
        y: 0.4,
        z: 0.2,
        header: 'FRELJORD',
        subHead: 'HARSH FROZEN LAND',
        text: 'The Freljord is a harsh and unforgiving land, where demi-gods walk the earth and the people are born warriors. While there are many individual tribes, the three greatest are the Avarosans, the Winter’s Claw, and the Frostguard, each uniquely shaped by their will to survive. It is also the only place on Runeterra where True Ice can be found.',
    },
    {
        src: 'texture/Ixtal_Crest.png',
        x: 0.4,
        y: -0.5,
        z: 0.2,
        header: 'IXTAL',
        subHead: 'PERILOUS EASTERN JUNGLES',
        text: 'Secluded deep in the wilderness of eastern Shurima, the sophisticated arcology-city of Ixaocan remains mostly free of outside influence. Having witnessed from afar the ruination of the Blessed Isles, and the softening of Buhru culture, the Ixtali view the other factions of Runeterra as little more than upstarts and pretenders, and use their powerful elemental magic to keep any intruders at bay.',
    },
    {
        src: 'texture/Mount_Targon_Crest.png',
        x: -0.3,
        y: -0.5,
        z: 0.2,
        header: 'TARGON',
        subHead: 'SPRAWLING WESTERN MOUNTAINS',
        text: 'A mountainous and sparsely inhabited region to the west of Shurima, Targon boasts the tallest peak in Runeterra. Located far from civilization, Mount Targon is all but impossible to reach, save by the most determined pilgrims, chasing some soul-deep yearning to reach its summit. Those hardy few who survive the climb return haunted and empty, or changed beyond all recognition.',
    },
    {
        src: 'texture/Piltover_and_Zaun_Crest.png',
        x: 0.3,
        y: -0.2,
        z: 0.2,
        header: 'PILTOVER & ZAUN',
        subHead: 'DUAL CITY-STATES',
        text: 'Dual city-states that control the major trade routes between Valoran and Shurima. Home both to visionary inventors and their wealthy patrons, the divide between social classes is becoming more dangerous.',
    },
    {
        src: 'texture/Bilgewater_Crest.png',
        x: 0.72,
        y: -0.15,
        z: 0.2,
        header: 'BILGEWATER',
        subHead: 'LAWLESS PORT CITY',
        text: 'Bilgewater is a port city like no other—home to monster hunters, dock-gangs, indigenous peoples, and traders from across the known world. Almost anything can be purchased here, from outlawed hextech to the favor of local crime lords. There is no better place to seek fame and fortune, though death lurks in every alleyway, and the law is almost non-existent.',
    },
    {
        src: 'texture/Noxus_Crest.png',
        x: 0,
        y: 0.2,
        z: 0.2,
        header: 'NOXUS',
        subHead: 'BRUTAL EXPANSIONIST EMPIRE',
        text: 'Noxus is a brutal, expansionist empire, yet those who look beyond its warlike exterior will find an unusually inclusive society. Anyone can rise to a position of power and respect if they display the necessary aptitude, regardless of social standing, background, or wealth. Noxians value strength above all, though that strength can manifest in many different ways.',
    },
];
const toggleSildebar = (header, subHead, text) => {
    document.getElementById('sidebar').classList.add('active');
    document.getElementById('headerSide').innerHTML = header;
    document.getElementById('subHeaderSide').innerHTML = subHead;
    document.getElementById('textSide').innerHTML = text;
};
const addLogo = (item) => {
    const img = document.createElement('img');
    img.setAttribute('id', 'img1');
    img.src = item.src;
    img.style.height = '60px';
    img.style.width = '52.5px';
    const imgLogo = new CSS2DObject(img);
    img.addEventListener('click', function () {
        toggleSildebar(item.header, item.subHead, item.text);
    });
    imgLogo.position.set(item.x, item.y, item.z);
    imgLogo.layers.set(0);
    mapMesh.add(imgLogo);
};
listRegions.forEach(function (item, index) {
    addLogo(item);
});

// rendering
const render = () => {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
};

animate();
