import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lists/:category/:id',
      name: 'Catergory',
      component: () => import(/* webpackChunkName: "about" */ './views/Category.vue')
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: () => import(/* webpackChunkName: "about" */ './views/Article.vue')
    },
    {
      path: '/search',
      name: 'Search',
      props: (route) => ({ search: route.query.q }),
      component: () => import(/* webpackChunkName: "about" */ './views/Search.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
