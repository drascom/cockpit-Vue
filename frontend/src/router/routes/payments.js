export default [
  {
    path: '/payments',
    name: 'payments',
    redirect: '/payments/list',
    meta: {
      requiresAuth: true,
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "payments" */ '@/views/Payments.vue'),
    children: [
      {
        path: 'new',
        name: 'paymentsnew',
        props: true,
        meta: {
          requiresAuth: true,
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "paymentcreate" */ '@/components/Payments/PaymentCreate.vue'
          )
      },
      {
        path: 'list',
        name: 'paymentslist',
        meta: {
          requiresAuth: true,
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName:
          "paymentlist" */
            '@/components/Payments/PaymentList.vue'
          )
      },
      {
        path: ':id',
        name: 'paymentsitem',
        props: true,
        meta: {
          requiresAuth: true,
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName:
          "payment" */
            '@/components/Payments/PaymentFile.vue'
          )
      }
    ]
  }
]
