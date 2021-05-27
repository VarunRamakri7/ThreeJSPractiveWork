// Basics and Primitives

import * as THREE from '../vendor/three/build/three.module.js';

function main() {
    document.title = "Test 1 - Basics and Primitives"; // Set title
    const canvas = document.querySelector('#c'); // Get canvas
    const renderer = new THREE.WebGLRenderer({canvas});
  
    // Make camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
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
  
    function MakeCubeInstance(geometry, color, xPosition)
    {
      const material = new THREE.MeshPhongMaterial({color});
  
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      cube.position.x = xPosition;
  
      return cube;
    }

    const cubes = [
      MakeCubeInstance(cubeGeometry, 0x44aa88,  0),
      MakeCubeInstance(cubeGeometry, 0x8844aa, -2),
      MakeCubeInstance(cubeGeometry, 0xaa8844,  2),
    ];
  
    // Make sphere instances
    const radius = 1;
    const widthSegments = 10;
    const heightSegments = 10;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  
    function MakeSphereInstance(geometry, color, xPosition)
    {
      const material = new THREE.MeshLambertMaterial({color});
  
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
  
      sphere.position.x = xPosition;
      sphere.position.y = 2;
  
      return sphere;
    }

    const spheres = [
        MakeSphereInstance(sphereGeometry, 0x44aa88,  0),
        MakeSphereInstance(sphereGeometry, 0x8844aa, -4),
        MakeSphereInstance(sphereGeometry, 0xaa8844,  4),
    ];

    // Make plane
    const planeWidth = 20;
    const planeHeight = 2;
    const planeGeometry = new THREE.BoxGeometry(planeWidth, planeHeight);
    const planeMaterial = new THREE.MeshPhongMaterial({color: 0xf9f9f9});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, -5, -10);
    plane.rotation.set(Math.PI / 2, 0, 0);
    scene.add(plane);

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
    
        // Animate cubes
        cubes.forEach((cube, ndx) => {
          const speed = 1 + ndx * .1;
          const rot = time * speed;
          cube.rotation.x = rot;
          cube.rotation.y = rot;
        });
    
        // Animate spheres
        spheres.forEach((sphere, ndx) => {
            const speed = 2 + ndx * .1;
            const rot = time * speed;
            sphere.rotation.x = rot;
            sphere.rotation.y = rot;
          });

        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }

      // Request Animation
      requestAnimationFrame(render);
    }
  
  main();  