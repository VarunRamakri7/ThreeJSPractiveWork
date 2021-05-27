import * as THREE from '../vendor/three/build/three.module.js';

function main() {
    document.title = "Solar System II"; // Set title
    const canvas = document.querySelector('#c'); // Get canvas
    const renderer = new THREE.WebGLRenderer({canvas});
  
    // Make camera
    const fov = 65;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 50, 50);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161717);

    // Add Directional Light to Scene
    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
  
    // Draw stars
    {
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const cubeGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      function MakeCubeInstance(geometry, color)
      {
        const material = new THREE.MeshStandardMaterial({emissive: color});
    
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        // Set cube position
        var pos = 200;
        cube.position.x = GetRandomInt(-pos, pos);
        cube.position.y = GetRandomInt(-pos, pos);
        cube.position.z = -50;
    
        return cube;
      }
  
      const stars = [];
      //const canvas = renderer.domElement;
      for(var i = 0; i < 500; i++)
      {
        stars.push(MakeCubeInstance(cubeGeometry, new THREE.Color('white')));
      }
    }

    // Make Solar System here
    /*const objects = [];
    
    // Empty object
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    // use just one sphere for everything
    const radius = 1;
    const widthSegments = 10;
    const heightSegments = 10;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    
    // Make sun
    const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);  // make the sun large
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    // Make Earth
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    // Make moon
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);
    
    const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);*/

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

      function GetRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

      // Request Animation
      requestAnimationFrame(render);
    }
  
  main();