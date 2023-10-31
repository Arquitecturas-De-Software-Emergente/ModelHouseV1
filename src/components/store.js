// store.js
import { createStore } from "vuex";

export default createStore({
  state: {
    userIsLoggedIn: false,
  },
  mutations: {
    setUserLoggedIn(state, isLoggedIn) {
      state.userIsLoggedIn = isLoggedIn;
    },
  },
});
