import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'TeacherList',
        name: 'TeacherList',
        component: () => import('@/views/TeacherList.vue')
      },
      {
        path: 'SubjectList',
        name: 'SubjectList',
        component: () => import('@/views/SubjectList.vue')
      },
      {
        path: 'CourseList',
        name: 'CourseList',
        component: () => import('@/views/CourseList.vue')
      },
      {
        path: 'AddCourse',
        name: 'AddCourse',
        component: () => import('@/views/AddCourse.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
