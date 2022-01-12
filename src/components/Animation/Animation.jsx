import React, { Component } from 'react';
import * as THREE from 'three';
import { AmmoPhysics } from './AmmoPhysics';
import * as shaders from './shaders';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
export class Animation extends Component {
  componentDidMount() {
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    var hero_boxcount = 110;
    var port_boxcount = 60;
    var footer_boxcount = 40;

    init();

    async function init() {
      let physics = await AmmoPhysics();

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

      const hero_scene = setupScene(document.querySelector('.hero_animation'));

      const portRightDivs = document.querySelectorAll('.proj_animation_left');
      const portLeftDivs = document.querySelectorAll('.proj_animation_right');

      const portLeftScenes = [];
      const portRightScenes = [];

      for (let portLeftDiv of portLeftDivs) {
        let scene = setupScene(portLeftDiv);
        scene.camera.position.set(0, 4, 3);
        scene.camera.lookAt(0, 0, 0);
        scene.camera.rotation.x = 0;
        scene.camera.rotation.y = 0;
        scene.camera.rotation.z = -1;
        portLeftScenes.push(scene);
      }
      for (let portRightDiv of portRightDivs) {
        let scene = setupScene(portRightDiv);
        scene.camera.position.set(0, 4, 3);
        scene.camera.lookAt(0, 0, 0);
        scene.camera.rotation.x = 0;
        scene.camera.rotation.y = 0;
        scene.camera.rotation.z = 1;
        portRightScenes.push(scene);
      }

      const footer_scene = setupScene(
        document.querySelector('.footer_animation')
      );

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
          vertexShader: shaders.vertexShader,
          fragmentShader: shaders.fragmentShader,
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
          vertexShader: shaders.vertexShader,
          fragmentShader: shaders.accentFragmentShader2,
        });

        sceneInfo.geometry = geometryBox;
        sceneInfo.material = material;
        sceneInfo.accent_material = accent_material;

        return sceneInfo;
      }

      // Flow Control Object

      const wall1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5, 0.5, 5),
        new THREE.MeshBasicMaterial({ color: 'blue' })
      );
      const wallPosition = {
        xRotation: 9.7,
        yRotation: 0,
        zRotation: 8.5,
        xPosition: 0,
        yPosition: 4,
        zPosition: -2,
      };

      wall1.rotation.x = wallPosition.xRotation;
      wall1.rotation.z = wallPosition.zRotation;
      wall1.position.y = wallPosition.yPosition;
      wall1.position.x = wallPosition.xPosition;
      wall1.position.z = wallPosition.zPosition;
      physics.addMesh(wall1);

      const wall2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(5, 0.5, 5),
        new THREE.MeshBasicMaterial({ color: 'blue' })
      );
      wall2.rotation.x = wallPosition.xRotation;
      wall2.rotation.z = -wallPosition.zRotation;
      wall2.position.y = wallPosition.yPosition;
      wall2.position.x = wallPosition.xPosition;
      wall2.position.z = wallPosition.zPosition;
      //footer_scene.scene.add(wall1);
      //footer_scene.scene.add(wall2);
      physics.addMesh(wall2);

      // Add boxes to scenes
      addSceneBoxes(hero_scene, hero_boxcount);
      addSceneBoxes(footer_scene, footer_boxcount);

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

      // footer_scene camera

      footer_scene.camera.position.set(0, 4, 2);
      footer_scene.camera.lookAt(0, 0, 2);
      footer_scene.camera.rotation.x = 0;
      footer_scene.camera.rotation.y = 1;
      footer_scene.camera.rotation.z = 0;

      // Renderer

      const canvas = document.getElementById('main_canvas');
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      document.body.appendChild(renderer.domElement);

      const footer_controls = new OrbitControls(
        footer_scene.camera,
        renderer.domElement
      );

      footer_controls.update();

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
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);
        renderer.render(scene, camera);
      }

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height);
        }
        return needResize;
      }

      let position = new THREE.Vector3();
      animate();

      function animate() {
        requestAnimationFrame(animate);

        resizeRendererToDisplaySize(renderer);

        renderer.setScissorTest(false);
        renderer.clear();
        renderer.setScissorTest(true);

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
        resetBoxes(footer_scene, -10, { x: -0.5, y: 6, z: -0.5 });

        renderSceneInfo(hero_scene);
        renderSceneInfo(footer_scene);

        for (let portLeftScene of portLeftScenes) {
          resetBoxes(portLeftScene, 2, { x: -0.5, y: 6, z: -0.5 });
          renderSceneInfo(portLeftScene);
        }

        for (let portRightScene of portRightScenes) {
          resetBoxes(portRightScene, 2, { x: -0.5, y: 6, z: -0.5 });
          renderSceneInfo(portRightScene);
        }

        footer_scene.camera.rotation.z += 0.015;

        stats.update();
      }
    }
  }
  render() {
    return <></>;
  }
}

export default Animation;
