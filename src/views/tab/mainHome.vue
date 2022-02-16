<template>
  <div class="realHome">
    <canvas class="webgl"></canvas>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

export default {
  setup() {
    const Router = useRouter()
    const Route = useRoute()
    const state = reactive({})
    const gui = new dat.GUI()
    const initAction = () => {
      const canvas = document.querySelector('.webgl')

      const scene = new THREE.Scene()

      const textureLoader = new THREE.TextureLoader()

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshStandardMaterial({
          roughness: 0.7
        })
      )

      scene.add(sphere)
      console.log('sphere', sphere)

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({
          color: '#a9c388'
        })
      )
      scene.add(floor)
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
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      console.log('sizes', sizes)

      window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        camera.aspect = sizes.width / sizes.height
        camera.updateProjectMatrix()
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
