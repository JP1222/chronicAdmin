import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/healthAssessment',
    component: Layout,
    redirect: '/healthAssessment/main',
    hideMenu: true,
    children: [
      {
        path: 'main',
        component: createNameComponent(() =>
          import('@/views/main/healthAssessment/index.vue')
        ),
        meta: { title: '健康测评' }
      }
    ]
  }
]

export default route
