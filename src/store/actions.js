import * as types from './mutation-types'

export const addToStore = ({ commit }, article) => {
  if (article.content) {
    commit(types.EDIT_ARTICLE, article);
  }
}

export const endEdit = ({ commit }) => {
  commit(types.END_EDIT);
}
