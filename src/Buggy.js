//import { GLTFLoader } from '../lib/threejs/examples/jsm/loaders/GLTFLoader.js';
// da wir eine importmap in index.html haben geht auch
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Buggy {

    constructor(scene, name) {
        this.scene = scene
        this.speed = 0
        this.direction = 0
        this.steer = 0

        this.frontWheelLeft
        this.frontWheelRight
        this.rearWheelLeft
        this.rearWheelRight

        this.model


        console.log("Buggy created!", name)
        this.loadBuggy()

        document.addEventListener('keydown', (event) => {
            console.log('keydown', event)
            if (event.key === 'w' || event.key === 'ArrowUp') {
                console.log("w oder up pressed")
                this.speed = 1
            } else if (event.key === 'a' || event.key === 'ArrowLeft') {
                this.steer = 1
                console.log("a oder left pressed")
            } else if (event.key === 's' || event.key === 'ArrowDown') {
                console.log("s oder down pressed")
                this.speed = -1
            } else if (event.key === 'd' || event.key === 'ArrowRight') {
                console.log("d oder right pressed")
                this.steer = -1
            }
        })

        document.addEventListener('keyup', (event) => {
            console.log('keydown', event)
            if (event.key === 'w' || event.key === 'ArrowUp') {
                this.speed = 0
            } else if (event.key === 'a' || event.key === 'ArrowLeft') {
                this.steer = 0
            } else if (event.key === 's' || event.key === 'ArrowDown') {
                this.speed = 0
            } else if (event.key === 'd' || event.key === 'ArrowRight') {
                this.steer = 0
            }
        })
    }

    animate() {
        this.direction += this.steer * 0.01 * this.speed
        let dx = Math.sin(this.direction) * this.speed * 0.1
        let dz = Math.cos(this.direction) * this.speed * 0.1

        //check if buggy is loaded
        if (this.model) {
            this.model.rotation.y = this.direction - Math.PI / 2
            this.model.position.x += dx
            this.model.position.z += dz

            if (this.steer == 1) {
                this.frontWheelLeft.rotation.y = Math.PI / 8
                this.frontWheelRight.rotation.y = -Math.PI / 8
            } else if (this.steer == -1) {
                this.frontWheelLeft.rotation.y = -Math.PI / 8
                this.frontWheelRight.rotation.y = Math.PI / 8
            } else {
                this.frontWheelLeft.rotation.y = 0
                this.frontWheelRight.rotation.y = 0
            }

            this.frontWheelLeft.rotation.z += -this.speed * 0.05
            this.frontWheelRight.rotation.z += this.speed * 0.05
            this.rearWheelRight.rotation.z += this.speed * 0.05
            this.rearWheelLeft.rotation.z += -this.speed * 0.05


            /* if (this.speed == 1) {
                 this.frontWheelLeft.rotation.z += dx
                 this.frontWheelRight.rotation.z += dx
                 this.rearWheelRight.rotation.z += dx
                 this.rearWheelLeft.rotation.z += dx
             } else if (this.speed == -1) {
                 this.frontWheelLeft.rotation.z -= dx
                 this.frontWheelRight.rotation.z -= dx
                 this.rearWheelRight.rotation.z -= dx
                 this.rearWheelLeft.rotation.z -= dx
             } else {
                 this.frontWheelLeft.rotation.z = 0
                 this.frontWheelRight.rotation.z = 0
                 this.rearWheelRight.rotation.z = 0
                 this.rearWheelLeft.rotation.z = 0
             }*/
        }


    }

    loadBuggy() {
        const loader = new GLTFLoader()
        //wenn der js code ausgeführt wird passiert das aus der index die auf root ist
        //daer muss hier der path von / angegeben werden
        loader.load('./assets/3D/buggy.glb', (gltf) => {
            gltf.scene.scale.x = 0.01
            gltf.scene.scale.y = 0.01
            gltf.scene.scale.z = 0.01
            this.scene.add(gltf.scene)
            this.model = gltf.scene

            this.model.traverse((child) => {
                console.log("child: ", child.name)
                if (child.name == "Front_wheel") {
                    this.frontWheelLeft = child
                } else if (child.name == "Front_wheel001") {
                    this.frontWheelRight = child
                } else if (child.name == "Rear_wheel") {
                    this.rearWheelLeft = child
                } else if (child.name == "Rear_wheel001") {
                    this.rearWheelRight = child
                }
            })
            console.log("buggy loaded", gltf.scene)
        }, function (xhr) {
            //gibt ladestatus von 3D modell an
            console.log(xhr.loaded / xhr.total * 100 + '% loaded')
        }, function (error) {
            console.log("an error happened", error)
        })

    }

}

//wenn nur eine klasse dann wird diese exportiert bei:
//export default
//oder spezifizieren:
export { Buggy }