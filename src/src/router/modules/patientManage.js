import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/patientManagement',
    component: Layout,
    redirect: '/patientManagement/main',
    children: [
      {
        path: 'main',
        component: createNameComponent(() =>
          import('@/views/main/patientManagement/index.vue')
        ),
        meta: { title: '患者管理', icon: 'el-icon-user' }
      }
    ]
  }
]

export default route
