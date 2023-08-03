import NotePage from '@/pages/Note/NotePage.vue'
import AddNotePage from '@/pages/Note/AddNotePage.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/note',
    component: NotePage,
    children: [
      {
        path: 'add',
        component: AddNotePage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
