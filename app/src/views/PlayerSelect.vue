<template>
  <div class="root">
    <ul class="num-list flex flex-between">
      <li v-for="index in 4" :key="index" class="flex flex-center flex-center-v">
        <router-link :to="link(index)">
          {{ index }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const state = reactive({})
    const route = useRoute()

    const link = (num: number) => {
      const gameName = route.params.game

      return `/games/${gameName}/${num}`
    }

    return reactive({
      ...toRefs(state),
      link,
    })
  },
})
</script>

<style lang="scss" scoped>
.num-list {
  width: 800px;
  margin: 100px auto;

  li {
    a {
      width: 180px;
      height: 180px;
      line-height: 180px;
      background-color: $base-color;
      color: white;
      font-size: 80px;
      text-align: center;
      vertical-align: middle;
    }
  }
}
</style>
