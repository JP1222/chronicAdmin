import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
    {
        path: '/ruleManagement',
        component: Layout,
        redirect: '/ruleManagement/main',
        children: [
            {
                path: 'main',
                component: createNameComponent(() =>
                    import('@/views/main/ruleManagement/index.vue')
                ),
                meta: { title: '会员管理', icon: 'el-icon-user-solid' }
            }
        ]
    }
]

export default route
