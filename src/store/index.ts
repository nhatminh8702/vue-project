// @ts-ignore
import {createStore} from 'vuex'

const store = createStore({
    state: {
        listNotes: []
    },
    getters: {
        getListNotes(state) {
            return state.listNotes
        },
        getNoteDetail: (state) => (id) => {
            return state.listNotes.find((note: any) => note.id == id)
        }
    },
    mutations: {
        setListNotes(state: any, listNotes: any) {
            state.listNotes = listNotes
        },
        setNote(state: any, noteProp: any) {
            const noteIndex = state.listNotes.findIndex((note: any) => note.id == noteProp.id)
            state.listNotes.splice(noteIndex, 1, noteProp)
        }
    },
    actions: {
        getListNote({commit, state}) {
            fetch('api/notes').then((res) => res.json()).then((json) => {
                commit('setListNotes', json.notes)
            })
        },
        addNote({commit, state},note) {
            fetch('api/add-note', {
                method: "POST",
                body: JSON.stringify({
                    value: note.value,
                    date: note.date
                }),
            })
        },
        updateNote({commit, state},note) {
            fetch('api/update-notes', {
                method: "POST",
                body: JSON.stringify({
                    value: note.value
                }),
            })
        },
        deleteNote({commit, state},id) {
            fetch(`api/delete-note/${id}`, {
                method: "DELETE",
            })
        }

    }
})
export default store
