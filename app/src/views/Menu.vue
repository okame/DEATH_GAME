<template>
  <div class="root">
    <ul class="btns text-center">
      <router-link to="player_select">
        <li class="btn">OVER</li>
      </router-link>
      <li class="btn">???</li>
      <li class="btn">???</li>
      <li class="btn">???</li>
    </ul>
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
.btns {
  margin-top: 50px;
}

.btn {
  font-size: 20px;
  padding: 20px 40px;
  margin: 50px auto;
  width: 300px;
}
</style>
