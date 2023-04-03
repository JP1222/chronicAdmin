import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/interactive',
    component: Layout,
    redirect: '/interactive/main',
    children: [
      {
        path: 'main',
        component: createNameComponent(() =>
          import('@/views/main/interactive/index.vue')
        ),
        meta: { title: '医患互动', icon: 'el-icon-chat-dot-square' }
      }
    ]
  }
]

export default route
