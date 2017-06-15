import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import canvas from './modules/canvas'
// import createLogger from '@/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'//在非生产环境下，使用严格模式

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        user,
        canvas
    },
    strict: debug,
    // plugins: debug ? [createLogger()] : []
})
