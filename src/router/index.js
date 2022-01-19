import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'mainHome',
    },
  },

  {
    path: '/',
    name: 'homeTabCon',
    component: Home,
    meta: {
      title: 'three',
    },
    children: [
      // 首页
      {
        path: 'mainHome',
        name: 'mainHome',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/tab/mainHome.vue'),
        meta: {
          title: 'three',
        },
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
