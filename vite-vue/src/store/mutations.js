let mutations = {
    CHANGE_USERNAME(state, name) {
        state.username = name
    },

    RESET_TOKEN() {
        localStorage.removeItem('token')
    },

    GET_ACTIVE_ROUTE(state, val) {
        state.activeRoute = val
    }
}

export default mutations