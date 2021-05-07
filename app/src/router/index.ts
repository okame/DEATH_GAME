import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import PlayerSelect from '../views/PlayerSelect.vue'
import Over from '../views/games/Over.vue'

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
    path: '/player_select/:game',
    name: 'PlayerSelect',
    component: PlayerSelect,
  },
  {
    path: '/games/over/:num',
    name: 'Over',
    component: Over,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
