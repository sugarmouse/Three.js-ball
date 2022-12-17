import './style.css'
import * as THREE from 'three'
import gsap from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const canvas = document.querySelector('canvas')

// mesh
const scene = new THREE.Scene

const geometry = new THREE.SphereGeometry(3, 64, 64)

const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}



// light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.intensity = 0.9
light.position.set(0, 10, 10)
scene.add(light)


// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// renderer
const renderer = new THREE.WebGL1Renderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(3)
renderer.render(scene, camera)

window.addEventListener('resize', () => {
  // update size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update() // make sure it keeps on going even if we let go
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

// Timeline magic
const t1 = gsap.timeline({ defaults: { duration: 1 } })
t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })


// moouse animation color
let rgb = []

window.addEventListener('mousemove', (e) => {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.width) * 255),
      150
    ]
    const newColor =  new THREE.Color(`rgb(${rgb.join(",")})`)
    // animate
    gsap.to(mesh.material.color, newColor)
})