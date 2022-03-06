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
      mapSrc1: require('@/assets/textures/door/color.jpg'),
      mapSrc2: require('@/assets/textures/door/alpha.jpg'),
      mapSrc3: require('@/assets/textures/door/ambientOcclusion.jpg'),
      mapSrc4: require('@/assets/textures/door/height.jpg'),
      mapSrc5: require('@/assets/textures/door/metalness.jpg'),
      mapSrc6: require('@/assets/textures/door/normal.jpg'),
      mapSrc7: require('@/assets/textures/door/roughness.jpg'),
      mapSrc8: require('@/assets/textures/matcaps/7.png'),
      mapSrc9: require('@/assets/textures/matcaps/8.png')
      //   mapSrc10: require('@/assets/textures/checkerboard-1024x1024.png')
    })
    const gui = new dat.GUI()
    const initAction = () => {
      const canvas = document.querySelector('.webgl')
      const scene = new THREE.Scene()
      const textureLoader = new THREE.TextureLoader()
      const doorColorTexture = textureLoader.load(state.mapSrc1)
      const doorAlphaTexture = textureLoader.load(state.mapSrc2)
      const matcapTexture = textureLoader.load(state.mapSrc9)
      //   const material = new THREE.MeshBasicMaterial({
      //     color: '#fff',
      //     // wireframe: true,
      //     map: doorColorTexture,
      //     transparent: true,
      //     opacity: 0.7,
      //     // alphaMap: doorAlphaTexture,
      //     side: THREE.DoubleSide,
      //     flatShading: true
      //   })
      //   const material = new THREE.MeshNormalMaterial({
      //     flatShading: true
      //     // wireframe: true
      //   })
      //   const material = new THREE.MeshMatcapMaterial({
      //     flatShading: true,
      //     matcap: matcapTexture,
      //     side: THREE.DoubleSide
      //     // wireframe: true
      //   })

      //   const material = new THREE.MeshLambertMaterial({
      //     // color: 0xffffff
      //   })
      const material = new THREE.MeshLambertMaterial()
      console.log('material', material)
      const ambientLight = new THREE.AmbientLight(0xf7ff5f, 1.0)
      scene.add(ambientLight)
      console.log('ambientLight', ambientLight)
      const pointLight = new THREE.PointLight(0xffffff, 0.5)
      pointLight.position.x = 2
      pointLight.position.y = 2
      pointLight.position.z = 3
      //   scene.add(pointLight)

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
