import * as THREE from '../vendor/three/build/three.module.js';

function main() {
    document.title = "Solar System II"; // Set title
    const canvas = document.querySelector('#c'); // Get canvas
    const renderer = new THREE.WebGLRenderer({canvas});
  
    // Make camera
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 100, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);  

    const scene = new THREE.Scene();

    // Add Directional Light to Scene
    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
  
    // Make Solar System here
    const objects = [];
    
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
    objects.push(moonMesh);

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

        // Animate objects
        objects.forEach((obj) => {
            obj.rotation.y = time;
          });
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }

      // Request Animation
      requestAnimationFrame(render);
    }
  
  main();