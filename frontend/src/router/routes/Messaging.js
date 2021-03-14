export default [
  {
    path: '/message',
    name: 'message',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Messaging.vue')
  }
]
