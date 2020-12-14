import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login'
import Home from './components/home'
import { nextDate } from 'element-ui/packages/date-picker/src/util'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/home', component: Home }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
