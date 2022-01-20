<template>
  <div class="realHome">
  
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as THREE from 'three';

export default {
  setup() {
    const Router = useRouter()
    const Route = useRoute()
    const state = reactive({
   
    })
    const initAction = ()=>{
                const scene = new THREE.Scene()
        // const camera = new THREE.OrthographicCamera(
        //     -1,
        //     1,
        //     1,
        //     -1,
        //     0.1,
        //     10
        // )
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)
        const axesHelper = new THREE.AxesHelper(3);
        scene.add(axesHelper);
        // gl_Position = projectionMatrix * modelViewMatrix * vec4( 1.0,1.0,1.0,1.0 );       
        const vertexShader = `
        void main() {           
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position,1.0 );
        }
        `
        const fragmentShader = `
        
        void main() {
             gl_FragColor = vec4( 1.0,0.3,0.0,1.0 );            
        }
        `
        // const geometry = new THREE.PlaneGeometry(2, 2)

        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        })
        const plane = new THREE.Mesh(geometry, material)
        scene.add(plane)
        camera.position.z = 10;
        camera.position.x = 4;
        camera.position.y = 2;
        // console.log( scene )
        // console.log(geometry)
        // console.log('plane', plane)
        window.addEventListener('mousemove', (e) => {
            let track1X = e.clientX - window.innerWidth / 2
            let track2X = track1X / (window.innerWidth)
            let resX = Math.sin(Math.PI * track2X)
            camera.position.x = resX
            // console.log('track2X', track2X)
            let track1Y = e.clientY - window.innerHeight / 2
            let track2Y = track1Y / (window.innerHeight)
            let resY = Math.sin(Math.PI * track2Y)
            // console.log(resX, resY)
            // console.log('track1Y', track1Y)
            // console.log('track2Y', track2Y)
            console.log('resY', resY)
            camera.position.y = resY
            renderer.render(scene, camera)
        })
        var int1 = 10;
        var int2 = 0;
        var int3 = 1.2;
        var int4 = 5;
        const tick = () => {
            // int1 += 0.1;
            // int2 += 0.1;
            // int3 += 0.1;
            // int4 += 0.1;
            // console.log('int1', int1)
            // plane.scale.x = int1
            // plane.position.y = int2
            // plane.scale.z = 4
            // plane.rotation.y = int3
            // plane.rotation.x = int4
            // plane.rotation.z = int4
            renderer.render(scene, camera)
            requestAnimationFrame(tick)
        }
        tick()
    }
    onMounted(() => {

initAction()
    })


    return {
      state,
    }
  },
}
</script>
<style lang="less" scoped>

</style>
