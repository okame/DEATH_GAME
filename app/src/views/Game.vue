<template>
  <div class="root">
    <div class="round-box">
      <span class="current-round">5</span>
      <span class="slash">/</span>
      <span class="all-round">8</span>
      <span class="text-round">ROUND</span>
    </div>

    <ul class="score-board flex flex-between">
      <li v-for="index in 4" :key="index" class="score-board-item">
        <div class="name">Player {{ index }}</div>
        <div class="score">400</div>
        <div class="life">LIFE 3/8</div>
      </li>
    </ul>

    <div class="main-area flex flex-between">
      <div class="before-score text-center">
        <h4>BEFORE</h4>
        <div class="before-score-value">103</div>
      </div>

      <div class="current-score text-center">51</div>

      <div class="results">
        <h4 class="text-center">Darts & Results</h4>

        <ul class="results-list">
          <li>BULL</li>
          <li>TRIPLE 18</li>
          <li class="pending">3</li>
        </ul>
      </div>
    </div>
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
.root {
  padding: 20px;

  .round-box {
    height: 30px;
    font-size: 20px;
    > * {
      display: inline-block;
    }
    .slash {
      margin: 0 5px;
    }
    .text-round {
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .score-board {
    padding: 20px;

    &-item {
      width: 160px;
      height: 160px;
      background-color: $base-color;
      color: white;
      text-align: center;
      box-sizing: border-box;
      padding: 20px;

      .name {
        font-size: 18px;
        margin-bottom: 10px;
      }

      .score {
        font-size: 50px;
        margin-bottom: 10px;
      }

      .life {
        font-size: 20px;
      }
    }
  }

  .main-area {
    > * {
      width: 33%;
    }

    .before-score {
      padding-top: 90px;

      h4 {
        font-size: 30px;
        text-decoration: underline;
      }

      &-value {
        font-size: 100px;
      }
    }

    .current-score {
      padding-top: 60px;
      font-size: 200px;
    }

    .results {
      padding-top: 20px;
      width: 200px;

      h4 {
        background-color: $base-color;
        color: white;
        font-size: 24px;
        padding: 10px;
      }

      .results-list {
        li {
          border-bottom: 1px solid #2c3e50;
          font-size: 30px;
          margin: 24px 0;
          display: inline-block;
          width: 100%;

          &.pending {
            text-align: center;
            &:before {
              content: '-';
            }
            &:after {
              content: '-';
            }
          }
        }
      }
    }
  }
}
</style>
