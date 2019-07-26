import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lobby from './views/Lobby.vue'
import Waiting from './views/Waiting.vue'
import GamePage from './views/GamePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/waiting/:id',
      name: 'waiting',
      component: Waiting
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage
    }
  ]
})
