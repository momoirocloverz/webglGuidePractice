<template>
  <div class="realHome">
  
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const Router = useRouter()
    const Route = useRoute()
    const state = reactive({
   
    })

    onMounted(() => {})


    return {
      state,
    }
  },
}
</script>
<style lang="less" scoped>

</style>
