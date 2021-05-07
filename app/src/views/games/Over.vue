<template>
  <div class="root">
    <div class="round-box">
      <span class="current-round">{{ results.round }}</span>
      <span class="slash">/</span>
      <span class="all-round">8</span>
      <span class="text-round">ROUND</span>
    </div>

    <ul class="score-board flex flex-between">
      <li v-for="index in playerNum" :key="index" class="score-board-item">
        <div class="name">Player {{ index }}</div>
        <div v-if="results.playerInformations[index - 1]" class="score">
          {{ results.playerInformations[index - 1].point }}
        </div>
        <div v-if="results.playerInformations[index - 1]" class="life">
          LIFE {{ results.playerInformations[index - 1].life }}/8
        </div>
      </li>
    </ul>

    <div class="main-area flex flex-between">
      <div class="before-score text-center">
        <h4>BEFORE</h4>
        <div class="before-score-value">{{ results.before }}</div>
      </div>

      <div v-if="!results.end" class="current-score text-center">
        <div class="player">Player {{ results.player + 1 }}</div>
        <div class="value">
          {{ results.currentTotalPoint }}
        </div>
      </div>

      <div v-if="results.end" class="end-message text-center">
        <div class="message">Winner!</div>
        <div class="player">Player {{ results.winner }}</div>
      </div>

      <div class="results">
        <h4 class="text-center">Darts & Results</h4>

        <ul class="results-list">
          <li v-for="index in 3" :key="index" :class="results.currentResults[index - 1] ? '' : 'pending'">
            {{ results.currentResults[index - 1] ? results.currentResults[index - 1].label : index }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import scoreManager from '../../lib/scoreManager'
import over, { OverResults } from '../../games/over'
import { Score } from '../../lib/scores'

type State = {
  results: OverResults
  playerNum: number
}

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute()
    const playerNum = Number(route.params.num)
    const state = reactive<State>({
      results: over.results,
      playerNum,
    })

    over.init(playerNum)

    scoreManager.handleDart((score: Score) => {
      state.results = { ...state.results, ...over.dart(score) }
    })

    scoreManager.handleChange(() => {
      state.results = { ...state.results, ...over.playerChange() }
    })

    scoreManager.observe()

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
    .before-score {
      padding-top: 90px;
      width: 200px;

      h4 {
        font-size: 30px;
        text-decoration: underline;
      }

      &-value {
        font-size: 100px;
      }
    }

    .current-score {
      padding-top: 40px;
      .player {
        font-size: 40px;
      }
      .value {
        font-size: 200px;
      }
    }

    .end-message {
      padding-top: 50px;
      font-size: 50px;
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
