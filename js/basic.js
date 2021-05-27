// Basics and Primitives

import * as THREE from '../vendor/three/build/three.module.js';

function main() {
    document.title = "Basic Three.js Template"; // Set title
    const canvas = document.querySelector('#c'); // Get canvas
    const renderer = new THREE.WebGLRenderer({canvas});
  
    // Make camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
  
    const scene = new THREE.Scene();
  
    // Add Directional Light to Scene
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
  
    // Make Cube instances
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const cubeGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);  
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);  

    // Make renderer responsive
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;

        const needResize = canvas.width !== width || canvas.height !== height;
        
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      function render(time) {
        time *= 0.001;
    
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }

      // Request Animation
      requestAnimationFrame(render);
    }
  
  main();