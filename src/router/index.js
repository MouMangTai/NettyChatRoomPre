import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'Home',
    children:[
      {
        path: 'Home',
        name: 'Home',
        component: ()=> import("@/views/Home")
      },
      {
        path: 'File',
        name: 'File',
        component: ()=> import("@/views/File")
      },
      {
        path: 'UserManage',
        name: 'UserManage',
        component: ()=> import("@/views/UserManage")
      },
      {
        path: 'Person',
        name: 'Person',
        component: ()=> import("@/views/Person")
      },
      {
        path: 'ChatLayout',
        name: 'ChatLayout',
        redirect: 'FriendLayout',
        component: ()=> import("@/layout/ChatLayout"),
        children:[
          {
            path: 'Friend',
            name: 'Friend',
            component: ()=> import("@/views/Friend")
          },
          {
            path: 'Dial',
            name: 'Dial',
            component: ()=> import("@/views/Dial")
          },
          {
            path: 'Room',
            name: 'Room',
            component: ()=> import("@/views/Room")
          }

        ]
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import("@/views/Login")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode:"hash"
})

export default router
