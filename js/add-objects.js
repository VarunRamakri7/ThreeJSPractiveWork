// Basics and Primitives

import * as THREE from "../vendor/three/build/three.module.js";

function main() {
  document.title = "Test 2 - Add Objects3D"; // Set title
  const canvas = document.querySelector("#c"); // Get canvas
  const renderer = new THREE.WebGLRenderer({ canvas });

  // Make camera
  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 120;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa); // Set background color

  // Add Directional Light to Scene
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  // Create and add objects to scene
  const objects = [];
  const spread = 15;

  function AddObjects(x, y, obj) {
    // Set cooordinates of object
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj); // Add object to scene
    objects.push(obj); // Add object to array
  }

  // Create material randomly for objects
  function CreateMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  function AddSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, CreateMaterial());
    AddObjects(x, y, mesh);
  }

  // Draw objects
  {
    const width = 8;
    const height = 8;
    const depth = 8;
    AddSolidGeometry(-2, 2, new THREE.BoxGeometry(width, height, depth));
  }
  {
    const radius = 7;
    const segments = 24;
    AddSolidGeometry(-1, 2, new THREE.CircleGeometry(radius, segments));
  }
  {
    const radius = 6;
    const height = 8;
    const segments = 16;
    AddSolidGeometry(0, 2, new THREE.ConeGeometry(radius, height, segments));
  }
  {
    const radiusTop = 4;
    const radiusBottom = 4;
    const height = 8;
    const radialSegments = 12;
    AddSolidGeometry(
      1,
      2,
      new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        radialSegments
      )
    );
  }
  {
    const radius = 7;
    AddSolidGeometry(2, 2, new THREE.DodecahedronGeometry(radius));
  }
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2,
    };

    AddSolidGeometry(-2, 1, new THREE.ExtrudeGeometry(shape, extrudeSettings));
  }
  {
    const radius = 7;
    AddSolidGeometry(-1, 1, new THREE.IcosahedronGeometry(radius));
  }
  {
    const points = [];
    for (let i = 0; i < 10; ++i) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8));
    }
    AddSolidGeometry(0, 1, new THREE.LatheGeometry(points));
  }
  {
    const radius = 7;
    AddSolidGeometry(1, 1, new THREE.OctahedronGeometry(radius));
  }
  {
    function klein(v, u, target) {
      u *= Math.PI;
      v *= 2 * Math.PI;
      u = u * 2;

      let x;
      let z;

      if (u < Math.PI) {
        x =
          3 * Math.cos(u) * (1 + Math.sin(u)) +
          2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
        z =
          -8 * Math.sin(u) -
          2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
      } else {
        x =
          3 * Math.cos(u) * (1 + Math.sin(u)) +
          2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
        z = -8 * Math.sin(u);
      }

      const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

      target.set(x, y, z).multiplyScalar(0.75);
    }

    const slices = 25;
    const stacks = 25;
    AddSolidGeometry(2, 1, new THREE.ParametricGeometry(klein, slices, stacks));
  }
  {
    const width = 9;
    const height = 9;
    const widthSegments = 2;
    const heightSegments = 2;
    AddSolidGeometry(
      -2,
      0,
      new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    );
  }
  {
    const verticesOfCube = [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
      -1, 1, 1,
    ];
    const indicesOfFaces = [
      2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
      3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
    ];
    const radius = 7;
    const detail = 2;
    AddSolidGeometry(
      -1,
      0,
      new THREE.PolyhedronGeometry(
        verticesOfCube,
        indicesOfFaces,
        radius,
        detail
      )
    );
  }
  {
    const innerRadius = 2;
    const outerRadius = 7;
    const segments = 18;
    AddSolidGeometry(
      0,
      0,
      new THREE.RingGeometry(innerRadius, outerRadius, segments)
    );
  }
  {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    AddSolidGeometry(1, 0, new THREE.ShapeGeometry(shape));
  }
  {
    const radius = 7;
    const widthSegments = 12;
    const heightSegments = 8;
    AddSolidGeometry(
      2,
      0,
      new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    );
  }
  {
    const radius = 7;
    AddSolidGeometry(-2, -1, new THREE.TetrahedronGeometry(radius));
  }
  {
    const radius = 5;
    const tubeRadius = 2;
    const radialSegments = 8;
    const tubularSegments = 24;
    AddSolidGeometry(
      0,
      -1,
      new THREE.TorusGeometry(
        radius,
        tubeRadius,
        radialSegments,
        tubularSegments
      )
    );
  }
  {
    const radius = 3.5;
    const tube = 1.5;
    const radialSegments = 8;
    const tubularSegments = 64;
    const p = 2;
    const q = 3;
    AddSolidGeometry(
      1,
      -1,
      new THREE.TorusKnotGeometry(
        radius,
        tube,
        tubularSegments,
        radialSegments,
        p,
        q
      )
    );
  }
  {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }
      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(4);
    const tubularSegments = 20;
    const radius = 1;
    const radialSegments = 8;
    const closed = false;
    AddSolidGeometry(
      2,
      -1,
      new THREE.TubeGeometry(
        path,
        tubularSegments,
        radius,
        radialSegments,
        closed
      )
    );
  }

  // Make renderer responsive
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;

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
    objects.forEach((obj, ndx) => {
      const speed = 0.1 + ndx * 0.05;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  // Request Animation
  requestAnimationFrame(render);
}

main();
