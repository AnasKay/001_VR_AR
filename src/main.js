import * as THREE from 'three'
import { Buggy } from './Buggy.js'

console.log("hello world")

let scene, camera, renderer, cube, buggy

const parameters = {
    color: 0xaabbcc,
    name: "anas",
    supertolleinfo: "test"
}

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)
    scene.background = new THREE.Color(0xffffff);

    //licht
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 5)
    scene.add(light)

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0x123afb })
    cube = new THREE.Mesh(geometry, material)

    scene.add(cube)
    camera.position.z = 5

    buggy = new Buggy(scene, "meinLieblingsBuggy")

    let button1 = document.getElementById("button1")
    let button2 = document.getElementById("button2")

    button1.addEventListener('click', onButton1)
    button2.addEventListener('click', onButton2)

    window.addEventListener('resize', onWindowResize)
}

//change Cube position when window is resized
function onWindowResize(event) {
    //console.log("resize", window.innerHeight, window.innerWidth)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)

    let ui = document.getElementById("ui")
    let button1 = document.getElementById("button1")
    let button2 = document.getElementById("button2")

    if (window.innerWidth < 500) {
        ui.style.backgroundColor = "#000"
        button1.style.width = 40 + "px"
        button2.style.width = 40 + "px"
    } else {
        ui.style.backgroundColor = "#aaf"
        button1.style.width = 200 + "px"
        button2.style.width = 200 + "px"
    }

    button1.style.left = 5 + "px" //"5px"
    button1.style.top = 5 + "px"
    button2.style.left = button1.clientWidth + 10 + "px"
    button2.style.top = 5 + "px"
}

function onButton1(event) {
    console.log("button1")
}

function onButton2(event) {
    console.log("button2")
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    buggy.animate()
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    //cool damit die cam dem buggy folgt:
    camera.lookAt(buggy.model.position)

}



init()
//damit die initial mal resized wird und die css changes aus dem js initial lädt
onWindowResize()
animate()