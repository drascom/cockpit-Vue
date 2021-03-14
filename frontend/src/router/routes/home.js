export default [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true,
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  }
]
