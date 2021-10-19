import React, { Component } from 'react';
import * as THREE from 'three';
import { AmmoPhysics } from './AmmoPhysics';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
export class Animation extends Component {
  componentDidMount() {
    var vertexShader = `
        varying vec3 vPos;
        void main()	{
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `;
    var fragmentShader = `

        varying vec3 vPos;
        uniform vec3 size;
        uniform float thickness;
        uniform float smoothness;

        void main() {

          float a = smoothstep(thickness, thickness + smoothness, length(abs(vPos.xy) - size.xy));
          a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.yz) - size.yz));
          a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.xz) - size.xz));

          vec3 c = mix(vec3(0), vec3(1), a);

          gl_FragColor = vec4(c, 1.0);
        }
      `;

    var accentFragmentShader = `
    
    varying vec3 vPos;
    uniform vec3 size;
    uniform float thickness;
    uniform float smoothness;
   
    void main() {
            
      float a = smoothstep(thickness, thickness + smoothness, length(abs(vPos.xy) - size.xy));
      a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.yz) - size.yz));
      a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.xz) - size.xz));
      
      vec3 c = mix(vec3(0), vec3(0.0627, 0.9137, 0.9333), a);
      
      gl_FragColor = vec4(c, 1.0);
    }
  `;
    let renderer, stats;
    let physics;

    // originally 180
    var hero_boxcount = 110;
    var port_boxcount = 40;
    var footer_boxcount = 40;

    let flowControlPositions;

    let hero_scene, port_scene, footer_scene;

    init();

    const heroDiv = document.querySelector('.hero_animation');
    const footerDiv = document.querySelector('.footer_animation');

    window.addEventListener('mousemove', onMouseMove);
    function onMouseMove(event) {
      // current sticking point: the z-index of the animations are -2 so the event doesn't reach them
      if (event.target !== heroDiv && event.target !== footerDiv) return;
      console.log('yes');
      //const { left, right, top, bottom, width, height } =
      //elem.getBoundingClientRect();
      //if (
      //event.clientX > right ||
      //event.clientX < left ||
      //event.clientY > top ||
      //event.clientY < bottom
      //)
      //return;
      //mouse.x = (event.clientX / width) * 2 - 1;
      //mouse.y = (event.clientY / height) * 2 + 1;
    }

    async function init() {
      physics = await AmmoPhysics();

      //Scenes

      function makeScene(elem) {
        const scene = new THREE.Scene();
        const fov = 50;
        const aspect = window.innerWidth / window.innerHeight; // the canvas default
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(1.4, 3.7, 1);
        camera.rotation.x = 1;
        camera.rotation.y = 1.7;
        camera.rotation.z = -0.7;
        // camera.lookAt(0, 0, 0);

        return { scene, camera, elem };
      }

      hero_scene = setupScene(document.querySelector('.hero_animation'));
      document
        .querySelector('.hero_animation')
        .addEventListener('mousemove', onMouseMove, false);

      port_scene = setupScene(document.querySelector('.proj_animation'));
      const portRightDivs = document.querySelectorAll('.proj_animation_left');
      const portLeftDivs = document.querySelectorAll('.proj_animation_right');

      const portLeftScenes = [];
      const portRightScenes = [];

      for (let portLeftDiv of portLeftDivs) {
        let scene = setupScene(portLeftDiv);
        scene.camera.position.set(0, 4, 6);
        scene.camera.lookAt(0, 0, 0);
        scene.camera.rotation.x = 0;
        scene.camera.rotation.y = 0;
        scene.camera.rotation.z = -1;
        portLeftScenes.push(scene);
      }
      for (let portRightDiv of portRightDivs) {
        let scene = setupScene(portRightDiv);
        scene.camera.position.set(0, 4, 6);
        scene.camera.lookAt(0, 0, 0);
        scene.camera.rotation.x = 0;
        scene.camera.rotation.y = 0;
        scene.camera.rotation.z = -1;
        portLeftScenes.push(scene);
      }

      footer_scene = setupScene(document.querySelector('.footer_animation'));

      function setupScene(elem) {
        const sceneInfo = makeScene(elem);
        const geometryBox = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
        const material = new THREE.ShaderMaterial({
          uniforms: {
            size: {
              value: new THREE.Vector3(
                geometryBox.parameters.width,
                geometryBox.parameters.height,
                geometryBox.parameters.depth
              ).multiplyScalar(0.5),
            },
            thickness: {
              value: 0.002,
            },
            smoothness: {
              value: 0.001,
            },
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        });
        const accent_material = new THREE.ShaderMaterial({
          uniforms: {
            size: {
              value: new THREE.Vector3(
                geometryBox.parameters.width,
                geometryBox.parameters.height,
                geometryBox.parameters.depth
              ).multiplyScalar(0.5),
            },
            thickness: {
              value: 0.002,
            },
            smoothness: {
              value: 0.001,
            },
          },
          vertexShader: vertexShader,
          fragmentShader: accentFragmentShader,
        });
        sceneInfo.geometry = geometryBox;
        sceneInfo.material = material;
        sceneInfo.accent_material = accent_material;

        return sceneInfo;
      }

      // Flow Control Object

      const flowControl = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5, 0.5, 5),
        new THREE.MeshBasicMaterial({ color: 'blue' })
      );
      flowControlPositions = {
        xRotation: 9.7,
        yRotation: 0,
        zRotation: 8.5,
        xPosition: 0,
        yPosition: 4,
        zPosition: -2,
      };

      flowControl.rotation.x = flowControlPositions.xRotation;
      flowControl.rotation.z = flowControlPositions.zRotation;
      flowControl.position.y = flowControlPositions.yPosition;
      flowControl.position.x = flowControlPositions.xPosition;
      flowControl.position.z = flowControlPositions.zPosition;
      flowControl.receiveShadow = true;
      // scene.add( flowControl );
      port_scene.scene.add(flowControl);
      physics.addMesh(flowControl);

      const flowControl2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5, 0.5, 5),
        // new THREE.ShadowMaterial( { color: 'blue' } )
        new THREE.MeshBasicMaterial({ color: 'blue' })
      );
      flowControl2.rotation.x = flowControlPositions.xRotation;
      flowControl2.rotation.z = -flowControlPositions.zRotation;
      flowControl2.position.y = flowControlPositions.yPosition;
      flowControl2.position.x = flowControlPositions.xPosition;
      flowControl2.position.z = flowControlPositions.zPosition;
      flowControl2.receiveShadow = true;
      // scene.add( flowControl2 );
      physics.addMesh(flowControl2);

      // Add boxes to scenes
      addSceneBoxes(hero_scene, hero_boxcount);
      addSceneBoxes(footer_scene, footer_boxcount);
      addSceneBoxes(port_scene, port_boxcount);

      for (let portLeftScene of portLeftScenes) {
        addSceneBoxes(portLeftScene, port_boxcount);
      }
      for (let portRightScene of portRightScenes) {
        addSceneBoxes(portRightScene, port_boxcount);
      }

      function addSceneBoxes(scene, boxCount) {
        const boxes = [];
        let box;
        for (let i = 0; i < boxCount; i++) {
          if (i < 1) {
            box = new THREE.Mesh(scene.geometry, scene.accent_material);
          } else {
            box = new THREE.Mesh(scene.geometry, scene.material);
          }
          scene.scene.add(box);
          physics.addMesh(box, 10);
          box.castShadow = true;
          box.receiveShadow = true;
          boxes.push(box);
        }
        scene.boxes = boxes;
      }

      // Footer Floor

      const floor = new THREE.Mesh(
        new THREE.BoxBufferGeometry(10, 5, 10),
        new THREE.MeshBasicMaterial({ color: '#10e9ee' })
      );
      floor.position.y = -1;
      floor.receiveShadow = true;
      footer_scene.scene.add(floor);
      physics.addMesh(floor);

      // footer_scene camera

      footer_scene.camera.position.set(0, 2, 1);
      footer_scene.camera.lookAt(0, 0, 0);
      footer_scene.camera.rotation.x = 1;
      footer_scene.camera.rotation.y = 0;
      footer_scene.camera.rotation.z = 0;

      // GUI

      var gui = new GUI();
      const footerCameraFolder = gui.addFolder('Footer Camera');
      footerCameraFolder
        .add(footer_scene.camera.position, 'y', 0, 10)
        .name('camera y');
      footerCameraFolder
        .add(footer_scene.camera.position, 'x', 0, 10)
        .name('camera x');
      footerCameraFolder
        .add(footer_scene.camera.position, 'z', 0, 10)
        .name('camera z');
      footerCameraFolder
        .add(footer_scene.camera.rotation, 'y', -1, 1)
        .name('rotation y');
      footerCameraFolder
        .add(footer_scene.camera.rotation, 'x', -1, 1)
        .name('rotation x');
      footerCameraFolder
        .add(footer_scene.camera.rotation, 'z', -1, 1)
        .name('rotation z');

      // const flowControlFolder = gui.addFolder('FlowControl');

      // flowControlFolder
      //     .add(flowControl.position, 'x', 0, 10)
      //     .name('flowControl x');
      // flowControlFolder
      //     .add(flowControl.position, 'z', 0, 10)
      //     .name('flowControl z');
      // flowControlFolder
      //     .add(flowControl.rotation, 'y', 0, 10)
      //     .name('fc rotation y');
      // flowControlFolder
      //     .add(flowControl.rotation, 'x', 8, 11)
      //     .name('fc rotation x');
      // flowControlFolder
      //     .add(flowControl.rotation, 'z', 0, 10)
      //     .name('fc rotation z');

      // flowControlFolder
      //     .add(flowControl2.position, 'x', 0, 10)
      //     .name('flowControl2 x');
      // flowControlFolder
      //     .add(flowControl2.position, 'z', 0, 10)
      //     .name('flowControl2 z');
      // flowControlFolder
      //     .add(flowControl2.rotation, 'y', 0, 10)
      //     .name('fc2 rotation y');
      // flowControlFolder
      //     .add(flowControl2.rotation, 'x', 8, 11)
      //     .name('fc2 rotation x');
      // flowControlFolder
      //     .add(flowControl2.rotation, 'z', 0, 10)
      //     .name('fc2 rotation z');

      // const portFrustumFolder = gui.addFolder('Port Frustum');
      // portFrustumFolder.add(port_scene.camera, 'left', -1000, 1000);
      // portFrustumFolder.add(port_scene.camera, 'right', -1000, 1000);
      // portFrustumFolder.add(port_scene.camera, 'top', -1000, 1000);
      // portFrustumFolder.add(port_scene.camera, 'bottom', -1000, 1000);

      // Renderer

      const canvas = document.getElementById('main_canvas');
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      document.body.appendChild(renderer.domElement);
      stats = new Stats();

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      function renderSceneInfo(sceneInfo) {
        const { scene, camera, elem } = sceneInfo;

        // get the viewport relative position of this element
        const { left, right, top, bottom, width, height } =
          // need to use this bounding rect to also orientate mouse for raycaster
          elem.getBoundingClientRect();
        const isOffscreen =
          bottom < 0 ||
          top > renderer.domElement.clientHeight ||
          right < 0 ||
          left > renderer.domElement.clientWidth;

        if (isOffscreen) {
          return;
        }
        // console.log(renderer)
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);
        renderer.render(scene, camera);
      }

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

      let position = new THREE.Vector3();
      animate();

      function animate() {
        requestAnimationFrame(animate);

        function resetBoxes(scene, resetY, newPos) {
          for (let i = 0; i < scene.boxes.length; i++) {
            if (scene.boxes[i].position.y < resetY) {
              position.set(
                Math.random() + newPos.x,
                Math.random() + newPos.y,
                Math.random() + newPos.z
              );
              physics.setMeshPosition(scene.boxes[i], position);
            }
          }
        }

        resetBoxes(hero_scene, 2, { x: -0.5, y: 6, z: -0.5 });
        resetBoxes(footer_scene, 2, { x: 0, y: 3, z: -0.5 });

        resizeRendererToDisplaySize(renderer);

        renderSceneInfo(hero_scene);
        for (let portLeftScene of portLeftScenes) {
          resetBoxes(portLeftScene, 2, { x: -0.5, y: 6, z: -0.5 });

          renderSceneInfo(portLeftScene);
        }
        for (let portRightScene of portRightScenes) {
          resetBoxes(portRightScene, 2, { x: -0.5, y: 6, z: -0.5 });

          renderSceneInfo(portRightScene);
        }
        renderSceneInfo(footer_scene);

        stats.update();
      }
    }
  }
  render() {
    return <div></div>;
  }
}

export default Animation;
