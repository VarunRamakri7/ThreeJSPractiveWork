import * as THREE from '../../vendor/three/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const aspectRatio = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, aspectRatio.width / aspectRatio.height);
camera.position.z = 5;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(aspectRatio.width, aspectRatio.height);

renderer.render(scene, camera);