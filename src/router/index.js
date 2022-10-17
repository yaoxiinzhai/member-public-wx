import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'home',
  component: () => import('@/views/layout/main.vue'),
  redirect: {
    name: 'integral'
  },
  children: [{
    path: '/integral',
    name: 'integral',
    component: () => import('@/views/pages/integral.vue'),
    meta: {
      menu: true,
      menuSite: 'bottom',
      menuName: '积分明细',
      icon: 'diamond-o',
    }
  }, {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import('@/views/pages/userCenter.vue'),
    meta: {
      menu: true,
      menuSite: 'bottom',
      menuName: '个人中心',
      icon: 'user-circle-o'
    }
  }]
}, {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/404.vue')
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router