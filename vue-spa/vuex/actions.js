export const getNoteList = ({ commit }) => {
  commit('GET_NOTE_LIST')
}

export const getSingleNote = ({ commit }) => {
  commit('GET_SINGLE_NOTE')
}

export const addNote = ({ commit }) => {
  commit('ADD_NOTE')
}

export const editNote = ({ commit }, text) => {
  commit('EDIT_NOTE', text)
}

export const deleteNote = ({ commit }) => {
  commit('DELETE_NOTE')
}

export const updateActiveNote = ({ commit }, note) => {
  commit('SET_ACTIVE_NOTE', note)
}

export const toggleFavorite = ({ commit }) => {
  commit('TOGGLE_FAVORITE')
}
