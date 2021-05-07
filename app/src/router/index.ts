import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import PlayerSelect from '../views/PlayerSelect.vue'
import Game from '../views/Game.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/player_select',
    name: 'PlayerSelect',
    component: PlayerSelect,
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
