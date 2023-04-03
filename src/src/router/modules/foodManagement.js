import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/foodManagement',
    component: Layout,
    redirect: '/foodManagement/guide',
    meta: { title: '食药管理', icon: 'el-icon-food' },
    children: [
      {
        path: 'guide',
        component: createNameComponent(() =>
          import('@/views/main/foodManagement/guide/index.vue')
        ),
        meta: { title: '饮食指导' }
      },
      {
        path: 'report',
        component: createNameComponent(() =>
          import('@/views/main/foodManagement/report/index.vue')
        ),
        meta: { title: '饮食汇报' }
      },
      // {
      //   path: 'drug',
      //   component: createNameComponent(() =>
      //     import('@/views/main/foodManagement/drug/index.vue')
      //   ),
      //   meta: { title: '药物推荐' }
      // }
    ]
  }
]

export default route
