export default [
  {
    path: '/customers',
    name: 'customers',
    meta: {
      requiresAuth: true,
      keepAlive: false
    },
    redirect: '/customers/home',
    component: () =>
      import(/* webpackChunkName: "customers" */ '@/views/Customers.vue'),
    children: [
      {
        path: 'new',
        name: 'customersnew',
        props: true,
        meta: {
          requiresAuth: true,
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName:
          "CustomersWizard" */
            '@/components/Customers/CustomerWizard.vue'
          )
      },
      {
        path: 'home',
        name: 'customershome',
        props: true,
        meta: {
          requiresAuth: true,
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName:
          "CustomersWizard" */
            '@/components/Customers/CustomerHome.vue'
          )
      },
      {
        path: 'list',
        name: 'customerlist',
        meta: {
          requiresAuth: true,
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName:
          "CustomerList" */
            '@/components/Customers/CustomerList.vue'
          )
      },
      {
        path: ':id',
        name: 'customersitem',
        props: true,
        meta: {
          requiresAuth: true,
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName:
          "CustomersWizard" */
            '@/components/Customers/CustomerFile.vue'
          )
      }
    ]
  }
]
