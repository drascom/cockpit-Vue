export default [{
  path: '/test',
  name: 'test',
  meta: {
    requiresAuth: true
  },
  component: () =>
    import ( /* webpackChunkName: "home" */ '@/views/Test.vue')
}]