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
      //   mapSrc1: require('@/assets/textures/door/ambientOcclusion.jpg')
      mapSrc1: require('@/assets/textures/door/color.jpg')
      //   mapSrc1: require('@/assets/textures/minecraft.png'),
      //   mapSrc1: require('@/assets/textures/checkerboard-1024x1024.png')
    })
    const gui = new dat.GUI()
    const initAction = () => {
      const canvas = document.querySelector('.webgl')
      const scene = new THREE.Scene()
      const material = new THREE.MeshBasicMaterial({
        color: '#578',
        wireframe: true
      })
      console.log('material', material)
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
      sphere.position.x = -1.5
      console.log('sphere', sphere)
      scene.add(sphere)
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
      scene.add(plane)
      const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material)
      torus.position.x = 1.5
      scene.add(torus)
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
      camera.position.x = 1
      camera.position.y = 1
      camera.position.z = 2

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

        sphere.rotation.y = 0.2 * elapsedTime
        plane.rotation.y = 0.1 * elapsedTime
        torus.rotation.y = 0.3 * elapsedTime

        sphere.rotation.x = 0.2 * elapsedTime
        plane.rotation.x = 0.1 * elapsedTime
        torus.rotation.x = 0.3 * elapsedTime

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
