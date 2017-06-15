
import * as types from '../mutation-types'

export default {
    state: {
      article: []
    },
    actions: {
        [types.EDIT_ARTICLE]({commit}, item) {
            commit(types.EDIT_ARTICLE, item)
        },
        [types.END_EDIT]({commit}) {
            commit(types.END_EDIT)
        }
    },
    mutations: {
        [types.EDIT_ARTICLE](state, item) {
          state.article = item;
        },
        [types.END_EDIT](state) {
          state.article = [];
        }
    }
}
