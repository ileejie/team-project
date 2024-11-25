let actions = {
    changeUserName({ commit }, name) {
        commit('CHANGE_USERNAME', name)
    },

    resetToken({ commit }) {
        commit('RESET_TOKEN')
    },

    getActiveRoute({ commit }, val) {
        commit('GET_ACTIVE_ROUTE', val)
    }
}

export default actions