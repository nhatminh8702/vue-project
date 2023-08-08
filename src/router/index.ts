import NotePage from '@/pages/Note/NotePage.vue'
import AddNotePage from '@/pages/Note/AddNotePage.vue'
import {createRouter, createWebHistory} from 'vue-router'
import NoteDetail from "@/pages/Note/NoteDetail.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'note',
            component: NotePage,

        },
        {
            path: '/note-add',
            name: 'note-add',
            component: AddNotePage
        },
        {
            path: '/note-detail/:id',
            name: 'note-detail',
            component: NoteDetail,
            props: true
        }
    ]
})

export default router
