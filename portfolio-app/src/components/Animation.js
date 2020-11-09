import * as THREE from 'three'
import { AmmoPhysics } from '../scripts/AmmoPhysics.js';
import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';

function Animation() {




    async function init() {
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

        let camera, scene, renderer, stats;
        let physics, position;

        let boxes, spheres, wireFrames;

        var boxCount = 180
        let flowControlPositions

        let liftIndex = 0

        let scene_1
        init();

        async function init() {

            physics = await AmmoPhysics();
            position = new THREE.Vector3();


            //Scenes

            function makeScene(elem) {
                const scene = new THREE.Scene();
                const fov = 50;
                const aspect = window.innerWidth / window.innerHeight;  // the canvas default
                const near = 0.1;
                const far = 1000;
                const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
                camera.position.set( 1.4, 3.7, 1 );
                camera.rotation.x = 1
                camera.rotation.y = 1.7
                camera.rotation.z = -0.7
                // camera.lookAt(0, 0, 0);

                return {scene, camera, elem};
            }

            scene_1 = setupScene(document.querySelector('#landing_screen_viewport'))

            function setupScene(elem) {

                const sceneInfo = makeScene(elem);
                const geometryBox = new THREE.BoxBufferGeometry( .2, .2, .2 );
                const material = new THREE.ShaderMaterial({
            uniforms: {
                size: {
                value: new THREE.Vector3(geometryBox.parameters.width, geometryBox.parameters.height, geometryBox.parameters.depth).multiplyScalar(0.5)
                },
                thickness: {
                    value: 0.002
                },
                smoothness: {
                    value: 0.001
                }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
            });
                sceneInfo.geometry = geometryBox;
                sceneInfo.material = material;


                return sceneInfo;
            }


            // Camera

            camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set( 1.4, 3.7, 1 );
            camera.rotation.x = 1
            camera.rotation.y = 1.7
            camera.rotation.z = -0.7
            // camera.lookAt( 1.5, 4.5, 1 );

            scene = new THREE.Scene();


            // Floor

            const floor = new THREE.Mesh(
                new THREE.BoxBufferGeometry( 10, 5, 10 ),
                new THREE.ShadowMaterial( { color: 'blue' } )
            );
            floor.position.y = - 10.5;
            floor.receiveShadow = true;
            scene.add( floor );
            physics.addMesh( floor );


            // Flow Control Object

            const flowControl = new THREE.Mesh(
                new THREE.BoxBufferGeometry( 5, .5, 5 ),
                new THREE.MeshBasicMaterial({ color: 'blue' } )
            );
            flowControlPositions = {
                xRotation : 9.7,
                yRotation : 0,
                zRotation : 8.5,
                xPosition : 0,
                yPosition : 4,
                zPosition : -2,
            }

            flowControl.rotation.x = flowControlPositions.xRotation
            flowControl.rotation.z = flowControlPositions.zRotation
            flowControl.position.y = flowControlPositions.yPosition;
            flowControl.position.x = flowControlPositions.xPosition;
            flowControl.position.z = flowControlPositions.zPosition;
            flowControl.receiveShadow = true;
            // scene.add( flowControl );
            physics.addMesh( flowControl );

            const flowControl2 = new THREE.Mesh(
                new THREE.BoxBufferGeometry( 5, .5, 5 ),
                // new THREE.ShadowMaterial( { color: 'blue' } )
                new THREE.MeshBasicMaterial({ color: 'blue' } )
            );
            flowControl2.rotation.x = flowControlPositions.xRotation
            flowControl2.rotation.z = -(flowControlPositions.zRotation)
            flowControl2.position.y = flowControlPositions.yPosition;
            flowControl2.position.x = flowControlPositions.xPosition;
            flowControl2.position.z = flowControlPositions.zPosition;
            flowControl2.receiveShadow = true;
            // scene.add( flowControl2 );
            physics.addMesh( flowControl2 );


            // Box Material/Geometry
            const geometryBox = new THREE.BoxBufferGeometry( .2, .2, .2 );
            var material = new THREE.ShaderMaterial({
            uniforms: {
                size: {
                value: new THREE.Vector3(geometryBox.parameters.width, geometryBox.parameters.height, geometryBox.parameters.depth).multiplyScalar(0.5)
                },
                thickness: {
                    value: 0.002
                },
                smoothness: {
                    value: 0.001
                }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
            });
            const matrix = new THREE.Matrix4();
            const color = new THREE.Color();


            // Wireframe Material

            const wireFrameMaterial = new THREE.LineBasicMaterial({color: 'black'})


            // Boxes

            boxes = []

            for (let i = 0; i < boxCount; i++) {
                var box = new THREE.Mesh(scene_1.geometry, scene_1.material)
                console.log('this')
                scene_1.scene.add( box );
                boxes.push(box)
                physics.addMesh( box, 10 );
                box.castShadow = true;
                box.receiveShadow = true;
            }


            // // Wireframe
            // var gui = new dat.GUI();
            // const cameraFolder = gui.addFolder("Camera")
            // cameraFolder.add(camera.position, "y", 0, 10).name("camera y");
            // cameraFolder.add(camera.position, "x", 0, 10).name("camera x");
            // cameraFolder.add(camera.position, "z", 0, 10).name("camera z");
            // cameraFolder.add(camera.rotation, "y", -4, 4).name("rotation y");
            // cameraFolder.add(camera.rotation, "x", -4, 4).name("rotation x");
            // cameraFolder.add(camera.rotation, "z", -4, 4).name("rotation z");

            // const boxLinesFolder = gui.addFolder("BoxLines")
            // boxLinesFolder.add(material.uniforms.thickness, "value", 0.001, .01).name("thickness");
            // boxLinesFolder.add(material.uniforms.smoothness, "value", 0.001, .01).name("smoothness");
            
            // const flowControlFolder = gui.addFolder("FlowControl")

            // flowControlFolder.add(flowControl.position, "x", 0, 10).name("flowControl x");
            // flowControlFolder.add(flowControl.position, "z", 0, 10).name("flowControl z");
            // flowControlFolder.add(flowControl.rotation, "y", 0, 10).name("fc rotation y");
            // flowControlFolder.add(flowControl.rotation, "x", 8, 11).name("fc rotation x");
            // flowControlFolder.add(flowControl.rotation, "z", 0, 10).name("fc rotation z");

        
            // flowControlFolder.add(flowControl2.position, "x", 0, 10).name("flowControl2 x");
            // flowControlFolder.add(flowControl2.position, "z", 0, 10).name("flowControl2 z");
            // flowControlFolder.add(flowControl2.rotation, "y", 0, 10).name("fc2 rotation y");
            // flowControlFolder.add(flowControl2.rotation, "x", 8, 11).name("fc2 rotation x");
            // flowControlFolder.add(flowControl2.rotation, "z", 0, 10).name("fc2 rotation z");


            // Renderer
            const canvas = document.getElementById("main_canvas")
            renderer = new THREE.WebGLRenderer( { canvas, antialias: true, alpha: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;
            renderer.outputEncoding = THREE.sRGBEncoding;
            document.body.appendChild( renderer.domElement );
            // document.getElementById("landing_screen").appendChild(renderer.domElement)
            // renderer.setClearColor(0x404040);
            stats = new Stats();
            // document.body.appendChild( stats.dom );


              function renderSceneInfo(sceneInfo) {

                const {scene, camera, elem} = sceneInfo;

                // get the viewport relative position of this element
                const {left, right, top, bottom, width, height} =
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
                renderer.render(scene, camera)


}

            
        animate();

        function animate() {

            requestAnimationFrame( animate );

            if (liftIndex === boxCount) {
                liftIndex = 0
            }
            else {
                liftIndex++
            }

            for (let i = 0; i < 2; i++) {
                // Picks a random box
                // Randomly sets a new position at top
                position.set( Math.random() - .5, Math.random() + 6, Math.random() - .5);
                physics.setMeshPosition(boxes[liftIndex], position)

                // boxes.setColorAt( index, color.setHex( 'blue' * Math.random() ) );
                // moves mesh to that position
                // physics.setMeshPosition( boxes, position, index );

            }

            //


            // renderer.render( scene, camera );
            renderSceneInfo(scene_1)
            stats.update();

            }

        }
    

    }
    return null
    
    }

export default Animation;