import Layout from '@/layout/index.vue'
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/Index.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register/Index.vue'),
        meta: { title: '注册' }
    },
    {
        path: '/forget',
        name: 'forget',
        component: () => import('@/views/Forget/Index.vue'),
        meta: { title: '注册' }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/Index.vue'),
        meta: { title: '404页面' }
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/homeIndex',
        component: Layout,
        meta: { title: '首页' },
        children: [
            {
                path: 'homeIndex',
                name: 'homeIndex',
                component: () => import('@/views/Home/Home.vue')
            },
            {
                path: 'homeInfo',
                name: 'homeInfo',
                component: () => import('@/views/Home/Info.vue')
            }
        ]
    },
    {
        path: '/goods',
        name: 'goods',
        redirect: '/goods/list',
        component: Layout,
        meta: { title: '商城' },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/Goods/Goods.vue')
            },
            {
                path: 'detail',
                name: 'detail',
                component: () => import('@/views/Goods/Detail.vue')
            }
        ]
    },
    {
        path: '/order',
        name: 'order',
        redirect: '/order/orderIndex',
        component: Layout,
        meta: { title: '订单' },
        children: [
            {
                path: 'orderIndex',
                name: 'orderIndex',
                component: () => import('@/views/Order/Index.vue')
            }
        ]
    },
    {
        path: '/data',
        name: 'data',
        redirect: '/data/dataIndex',
        component: Layout,
        meta: { title: '数据' },
        children: [
            {
                path: 'dataIndex',
                name: 'dataIndex',
                component: () => import('@/views/Data/Index.vue')
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        redirect: '/user/userIndex',
        component: Layout,
        meta: { title: '用户' },
        children: [
            {
                path: 'userIndex',
                name: 'userIndex',
                component: () => import('@/views/User/Index.vue')
            }
        ]
    },
    {
        path: '/permission',
        name: 'permission',
        redirect: '/permission/permissionIndex',
        component: Layout,
        meta: { title: '权限' },
        children: [
            {
                path: 'permissionIndex',
                name: 'permissionIndex',
                component: () => import('@/views/Permission/Index.vue')
            }
        ]
    },
    {
        path: '/contact',
        name: 'contact',
        redirect: '/contact/contactIndex',
        component: Layout,
        meta: { title: '联系我们' },
        children: [
            {
                path: 'contactIndex',
                name: 'contactIndex',
                component: () => import('@/views/Contact/Contact.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'about',
        redirect: '/about/aboutIndex',
        component: Layout,
        meta: { title: '关于我们' },
        children: [
            {
                path: 'aboutIndex',
                name: 'aboutIndex',
                component: () => import('@/views/About/About.vue')
            }
        ]
    },
    {
        path: '/person',
        name: 'person',
        redirect: '/person/userCenter',
        component: Layout,
        meta: { title: '个人中心' },
        children: [
            {
                path: 'userCenter',
                name: 'userCenter',
                component: () => import('@/views/Person/Info.vue')
            },
            {
                path: 'password',
                name: 'password',
                component: () => import('@/views/Person/Password.vue')
            }
        ]
    },
    {
        path: '/service',
        name: 'service',
        redirect: '/service/serviceIndex',
        component: Layout,
        meta: { title: '服务支持' },
        children: [
            {
                path: 'serviceIndex',
                name: 'serviceIndex',
                component: () => import('@/views/Service/Index.vue')
            }
        ]
    },
    {
        path: '/message',
        name: 'message',
        redirect: '/message/messageIndex',
        component: Layout,
        meta: { title: '消息中心' },
        children: [
            {
                path: 'messageIndex',
                name: 'messageIndex',
                component: () => import('@/views/Message/Index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router