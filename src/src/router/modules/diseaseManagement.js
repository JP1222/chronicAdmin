import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/diseaseManagement',
    component: Layout,
    redirect: '/diseaseManagement/main',
    children: [
      {
        path: 'main',
        component: createNameComponent(() =>
          import('@/views/main/diseaseManagement/index.vue')
        ),
        meta: { title: '疾病汇报', icon: 'el-icon-notebook-2' }
      }
    ]
  }
]

export default route
