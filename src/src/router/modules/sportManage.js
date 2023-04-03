import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/sportManagement',
    component: Layout,
    redirect: '/sportManagement/exercise',
    meta: { title: '运动管理', icon: 'el-icon-football' },
    children: [
      {
        path: 'exercise',
        component: createNameComponent(() =>
          import('@/views/main/sportMangement/exercise/index.vue')
        ),
        meta: { title: '运动处方' }
      },
      {
        path: 'action',
        component: createNameComponent(() =>
          import('@/views/main/sportMangement/action/index.vue')
        ),
        meta: { title: '动作库' }
      },
      {
        path: 'sportReport',
        component: createNameComponent(() =>
          import('@/views/main/sportMangement/sportReport/index.vue')
        ),
        meta: { title: '运动汇报' }
      }
    ]
  }
]

export default route
