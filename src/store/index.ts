// @ts-ignore
import { createStore } from 'vuex'

const store = createStore({
  state: {
    listNotes: [
      { id: 1, value: 'asdasdassadsdasdasdasdsadsda', date: '9/7/2022' },
      { id: 2, value: 'asdasdassadsdasdasdasdsadsda', date: '10/7/2022' }
    ]
  },
  mutations: {
    setListNotes(state: any, listNotes: any) {
      state.listNotes = listNotes
    }
  }
})
export default store
