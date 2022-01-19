<template>
  <div class="homeMaster">
    <router-view />    
  </div>
</template>
<script>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const Router = useRouter()
    const Route = useRoute()
    const state = reactive({

    })
    onMounted(() => {
    })

    return {
      state,
    }
  },
}
</script>
<style lang="less" scoped>
.fixBottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
.homeMaster {
  padding-bottom: 1rem;
  box-sizing: border-box;
}
.nav-bottom {
  height: 1rem;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  div {
    overflow: hidden;
    text-align: center;
    flex: 1;
    img {
      width: 0.5rem;
    }
    p {
      font-size: 0.22rem;
      font-weight: 500;
    }
    .bottomTextOld {
      font-size: 0.3rem;
    }
  }
}
.navBottomOld {
  height: 1.3rem;
}
</style>
