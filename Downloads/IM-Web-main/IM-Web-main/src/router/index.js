import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    name: 'consultant',
    path: '/consultant',
    component: () => import('@/views/consultant/index'),
    redirect: '/consultant/frontpage',
    children: [
      {
        name: 'frontpage',
        path: '/consultant/frontpage',
        component: () => import('@/views/consultant/frontpage')
      },
      {
        name: 'record',
        path: '/consultant/record',
        component: () => import('@/views/consultant/record')
      },
      {
        name: 'connect',
        path: '/consultant/connect',
        component: () => import('@/views/index/index'),
        hidden: true
      },
    ]
  },
  {
    name: 'helper',
    path: '/helper',
    component: () => import('@/views/helper/index'),
    redirect: '/helper/frontpage',
    children: [
      {
        name: 'frontpage',
        path: '/helper/frontpage',
        component: () => import('@/views/helper/frontpage')
      },
      {
        name: 'record',
        path: '/helper/record',
        component: () => import('@/views/helper/record')
      },
      {
        name: 'connect',
        path: '/helper/connect',
        component: () => import('@/views/index/index-helper'),
        hidden: true
      },
    ]
  },
  {
    name: 'admin',
    path: '/admin',
    component: () => import('@/views/admin/index'),
    redirect: '/admin/frontpage',
    children: [
      {
        name: 'frontpage',
        path: '/admin/frontpage',
        component: () => import('@/views/admin/frontpage')
      },
      {
        name: 'record',
        path: '/admin/record',
        component: () => import('@/views/admin/record')
      },
      {
        name: 'schedule',
        path: '/admin/schedule',
        component: () => import('@/views/admin/schedule')
      },
      {
        name: 'consultant',
        path: '/admin/consultant',
        component: () => import('@/views/admin/consultant')
      },
      {
        name: 'helper',
        path: '/admin/helper',
        component: () => import('@/views/admin/helper')
      },
      {
        name: 'visitor',
        path: '/admin/visitor',
        component: () => import('@/views/admin/visitor')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
