if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats, clock, mixer, controls;
var camera, scene, renderer, objects;

init();
animate();

function init() {

    container = document.getElementById('container');

    console.log("test***:",container);
    alert("test***:" + container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(2, 4, 5);

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    mixer = new THREE.AnimationMixer(scene);

    var loader = new THREE.JSONLoader();

    loader.load('assets/models/rectangle/test.json', function (geometry, materials) {
        var mesh = new THREE.Mesh(geometry, materials);
        scene.add(mesh);
    });

    // lights

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xff4400, 5, 30);
    pointLight.position.set(5, 0, 0);
    scene.add(pointLight);

    // renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    
    stats = new Stats();
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera,renderer.domElement);

    // events

    window.addEventListener('resize', onWindowResize, false);

}

//

function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//
function animate() {
    stats.update();
//    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}
