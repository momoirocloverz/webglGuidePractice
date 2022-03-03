<template>
  <div class="realHome">
    <canvas class="webgl"></canvas>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

export default {
  setup() {
    const state = reactive({
      //   mapSrc1: require('@/static/textures/door/color.jpg'),
      mapSrc1: require('@/assets/textures/minecraft.png')
    })
    const gui = new dat.GUI()
    const initAction = () => {
      const canvas = document.querySelector('.webgl')
      const scene = new THREE.Scene()
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load(
        state.mapSrc1,
        () => {
          console.log('loading texture finished')
        },
        () => {
          console.log('loading texture progressing')
        },
        () => {
          console.log('loading texture error')
        }
      )
      console.log('texture', texture)

      texture.wrapS = THREE.MirroredRepeatWrapping
      texture.wrapT = THREE.MirroredRepeatWrapping

      texture.generateMipmaps = false
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
      // const spereMaterial = new THREE.MeshStandardMaterial({
      //   roughness: 0.7,
      // })
      const spereMaterial = new THREE.MeshBasicMaterial({
        map: texture
      })
      //   const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), spereMaterial)
      //   scene.add(sphere)
      //   console.log('sphere', sphere)
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const mesh = new THREE.Mesh(geometry, spereMaterial)

      scene.add(mesh)

      const floorColor = {
        color: '#a9c388',
        spin: () => {
          console.log('hi spin')
        }
      }
      const floorMaterial = new THREE.MeshStandardMaterial(floorColor)
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMaterial)
      //   scene.add(floor)
      const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
      gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
      scene.add(ambientLight)

      const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
      moonLight.position.set(4, 5, -2)
      gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
      gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
      gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
      gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
      scene.add(moonLight)
      gui.add(floor, 'visible').name('floorVisible')
      gui.add(spereMaterial, 'wireframe')
      gui.add(floorColor, 'color').onChange(() => {
        floorMaterial.color.set(floorColor.color)
      })
      gui.add(floorColor, 'spin')
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio * 2)
      })

      const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
      camera.position.x = 4
      camera.position.y = 2
      camera.position.z = 5

      scene.add(camera)
      const controls = new OrbitControls(camera, canvas)
      controls.enableDamping = true
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      })
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio * 2)
      const clock = new THREE.Clock()
      const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        controls.update()
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
      }
      tick()
    }
    onMounted(() => {
      initAction()
    })

    return {
      state
    }
  }
}
</script>
<style lang="less" scoped></style>
