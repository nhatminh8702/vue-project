// @ts-ignore
import {createStore} from 'vuex'

const store = createStore({
    state: {
        listNotes: [
            {id: 1, value: 'Go to the gym', checked: true, date: '9/7/2022'},
            {id: 2, value: 'Make some note', checked: false, date: '10/7/2022'}
        ]
    },
    mutations: {
        setListNotes(state: any, listNotes: any) {
            state.listNotes = listNotes
        }
    }
})
export default store
