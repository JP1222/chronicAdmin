import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/announcements',
    component: Layout,
    children: [
      {
        path: 'main',
        component: createNameComponent(() =>
          import('@/views/main/announcements/index.vue')
        ),
        meta: { title: '公告管理', icon: 'el-icon-setting' }
      }
    ]
  }
]

export default route
