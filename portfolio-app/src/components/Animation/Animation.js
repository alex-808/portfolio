import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AmmoPhysics } from 'three/examples/jsm/physics/AmmoPhysics.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
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
        let camera, scene, renderer, stats;
        let physics, position;

        let hero_boxes, port_boxes, footer_boxes;

        // originally 180
        var hero_boxcount = 110;
        var port_boxcount = 20;
        var footer_boxcount = 40;

        let flowControlPositions;
        let hero_lift_index = 0;
        let port_lift_index = 0;
        let footer_lift_index = 0;

        let hero_scene, port_scene, footer_scene;
        let accent_color;
        let port_controls;

        init();

        async function init() {
            physics = await AmmoPhysics();
            position = new THREE.Vector3();

            //Scenes

            function makeScene(elem) {
                const scene = new THREE.Scene();
                const fov = 50;
                const aspect = window.innerWidth / window.innerHeight; // the canvas default
                const near = 0.1;
                const far = 1000;
                const camera = new THREE.PerspectiveCamera(
                    fov,
                    aspect,
                    near,
                    far
                );
                camera.position.set(1.4, 3.7, 1);
                camera.rotation.x = 1;
                camera.rotation.y = 1.7;
                camera.rotation.z = -0.7;
                // camera.lookAt(0, 0, 0);

                return { scene, camera, elem };
            }

            hero_scene = setupScene(document.querySelector('.hero_animation'));

            // port_scene = setupScene(
            //     document.querySelector('#port_animation')
            // );

            footer_scene = setupScene(
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

            // Camera

            scene = new THREE.Scene();

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

            // Hero Boxes

            hero_boxes = [];
            footer_boxes = [];

            for (let i = 0; i < hero_boxcount; i++) {
                if (i < 1) {
                    var box = new THREE.Mesh(
                        hero_scene.geometry,
                        hero_scene.accent_material
                    );
                } else {
                    var box = new THREE.Mesh(
                        hero_scene.geometry,
                        hero_scene.material
                    );
                }

                console.log('this');
                hero_scene.scene.add(box);
                hero_boxes.push(box);
                physics.addMesh(box, 10);
                box.castShadow = true;
                box.receiveShadow = true;
            }

            // Port Boxes

            // port_boxes = [];

            // for (let i = 0; i < port_boxcount; i++) {
            //     var port_box = new THREE.Mesh(
            //         new THREE.BoxBufferGeometry(5, 5, 5),
            //         hero_scene.accent_material
            //     );
            //     port_box.position.x = 0;
            //     port_box.position.y = 0;
            //     port_box.position.z = 0;
            //     port_box.material.wireframe = true;
            //     port_scene.scene.add(port_box);
            //     port_boxes.push(port_box);

            //     // physics.addMesh(port_box, 10);
            // }
            // var {
            //     left,
            //     right,
            //     top,
            //     bottom,
            // } = port_scene.elem.getBoundingClientRect();

            // console.log(port_scene.elem.getBoundingClientRect());

            // // const port_camera = new THREE.OrthographicCamera(
            // //     left,
            // //     right,
            // //     top,
            // //     bottom,
            // //     1,
            // //     2000
            // // );

            // const port_camera = new THREE.OrthographicCamera(
            //     10,
            //     -10,
            //     2,
            //     -2,
            //     1,
            //     2000
            // );
            // // we are working on this bullshit
            // port_scene.camera = port_camera;

            // port_scene.camera.position.set(0, 0, 0);
            // port_scene.camera.lookAt(0, 0, 0);
            // port_scene.camera.rotation.x = 0;
            // port_scene.camera.rotation.y = 0;
            // port_scene.camera.rotation.z = 0;

            // // where you are on the page when you reload matters
            // // right now it is showing up if the div is in the center of my screen
            // // idk i think that the orthographic camera's aspect or something is fucked up

            // console.log(port_scene);

            // Footer Boxes

            for (let i = 0; i < footer_boxcount; i++) {
                if (i < 1) {
                    var footer_box = new THREE.Mesh(
                        footer_scene.geometry,
                        footer_scene.accent_material
                    );
                } else {
                    var footer_box = new THREE.Mesh(
                        footer_scene.geometry,
                        footer_scene.material
                    );
                }

                footer_box.castShadow = true;
                footer_box.recieveShadow = true;
                footer_scene.scene.add(footer_box);
                footer_boxes.push(footer_box);
                physics.addMesh(footer_box, 10);
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

            console.log(footer_scene.camera);

            // GUI

            // var gui = new dat.GUI();
            // const footerCameraFolder = gui.addFolder('Footer Camera');
            // footerCameraFolder
            //     .add(footer_scene.camera.position, 'y', 0, 10)
            //     .name('camera y');
            // footerCameraFolder
            //     .add(footer_scene.camera.position, 'x', 0, 10)
            //     .name('camera x');
            // footerCameraFolder
            //     .add(footer_scene.camera.position, 'z', 0, 10)
            //     .name('camera z');
            // footerCameraFolder
            //     .add(footer_scene.camera.rotation, 'y', -1, 1)
            //     .name('rotation y');
            // footerCameraFolder
            //     .add(footer_scene.camera.rotation, 'x', -1, 1)
            //     .name('rotation x');
            // footerCameraFolder
            //     .add(footer_scene.camera.rotation, 'z', -1, 1)
            //     .name('rotation z');

            // const portCameraFolder = gui.addFolder('Port Camera');
            // portCameraFolder
            //     .add(port_scene.camera.position, 'y', -500, 0)
            //     .name('camera y');
            // portCameraFolder
            //     .add(port_scene.camera.position, 'x', -500, 0)
            //     .name('camera x');
            // portCameraFolder
            //     .add(port_scene.camera.position, 'z', -500, 0)
            //     .name('camera z');
            // portCameraFolder
            //     .add(port_scene.camera.rotation, 'y', -3, 3)
            //     .name('rotation y');
            // portCameraFolder
            //     .add(port_scene.camera.rotation, 'x', -3, 3)
            //     .name('rotation x');
            // portCameraFolder
            //     .add(port_scene.camera.rotation, 'z', -3, 3)
            //     .name('rotation z');

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

            // port_controls = new OrbitControls(
            //     port_scene.camera,
            //     renderer.domElement
            // );
            // port_controls.autoRotate = true;
            // port_controls.enableKeys = true;
            // port_controls.mouseButtons = {
            //     LEFT: THREE.MOUSE.ROTATE,
            //     MIDDLE: THREE.MOUSE.DOLLY,
            //     RIGHT: THREE.MOUSE.PAN,
            // };
            // port_controls.domElement = document.querySelector(
            //     '#port_animation'
            // );
            // port_controls.enableDamping = true;
            // console.log(port_controls);
            // port_controls.update();

            function renderSceneInfo(sceneInfo) {
                const { scene, camera, elem } = sceneInfo;

                // get the viewport relative position of this element
                const {
                    left,
                    right,
                    top,
                    bottom,
                    width,
                    height,
                } = elem.getBoundingClientRect();
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

                const positiveYUpBottom =
                    renderer.domElement.clientHeight - bottom;
                renderer.setScissor(left, positiveYUpBottom, width, height);
                renderer.setViewport(left, positiveYUpBottom, width, height);
                renderer.render(scene, camera);
            }

            animate();

            function animate() {
                requestAnimationFrame(animate);
                // port_controls.update();

                // Hero Lift

                if (hero_lift_index === hero_boxcount - 1) {
                    hero_lift_index = 0;
                } else {
                    hero_lift_index++;
                }
                // for (let i = 0; i < 2; i++) {
                position.set(
                    Math.random() - 0.5,
                    Math.random() + 6,
                    Math.random() - 0.5
                );
                // console.log(hero_boxes[hero_lift_index]);
                physics.setMeshPosition(hero_boxes[hero_lift_index], position);
                // }

                // Port Lift
                // if (port_lift_index % 10 === 0) {
                //     if (port_lift_index === port_boxcount) {
                //         port_lift_index = 0;
                //     } else {
                //         port_lift_index++;
                //     }
                //     position.set(
                //         Math.random(),
                //         Math.random(),
                //         Math.random()
                //     );
                //     physics.setMeshPosition(
                //         port_boxes[port_lift_index],
                //         position
                //     );
                // }

                // Footer Lift

                if (footer_lift_index === footer_boxcount - 1) {
                    footer_lift_index = 0;
                } else {
                    footer_lift_index++;
                }
                position.set(
                    Math.random() * 2 - 1,
                    Math.random() + 3,
                    Math.random() - 0.5
                );
                physics.setMeshPosition(
                    footer_boxes[footer_lift_index],
                    position
                );

                renderSceneInfo(hero_scene);
                // renderSceneInfo(port_scene);
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
