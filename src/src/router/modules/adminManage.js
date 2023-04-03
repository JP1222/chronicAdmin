// 系统管理

import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/adminManage',
    component: Layout,
    redirect: '/adminManage/main',
    meta: { title: 'dashboard', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'main',
        component: createNameComponent(() =>
          import('@/views/main/adminManage/index.vue')
        ),
        meta: { title: '系统管理', icon: 'el-icon-s-tools' }
      }
    ]
  }
]

export default route
