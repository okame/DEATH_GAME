<template>
  <div class="page page-home">
    <h1>コッペダーツ</h1>
    <router-link to="/menu">
      <button class="btn btn-start">START</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({})

    return reactive({
      ...toRefs(state),
    })
  },
})
</script>

<style lang="scss" scoped>
.page {
  text-align: center;
}

h1 {
  font-size: 60px;
  margin-top: 170px;
  margin-bottom: 100px;
}

.btn {
  font-size: 30px;
  padding: 20px 40px;
}
</style>
