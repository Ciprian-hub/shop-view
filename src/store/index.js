import {createStore} from "vuex";

const store = createStore({
    state: {
        test: '1234',
        user: {
            token: '122'
        }
    },
    actions: {},
    getters: {},
    mutations: {},
})

export default store