import { createStore } from 'vuex';

interface RootState {
  showModal: boolean;
}

export default createStore<RootState>({
  state: {
    showModal: false
  },
  getters: {
  },
  mutations: {
    setShowModal(state, show: boolean) {
      state.showModal = show;
    },
  },
  actions: {
    handleShowModal({ commit }, payload: { showModal: boolean }){
      commit('setShowModal', payload.showModal);
    },
  },
  modules: {
  }
})
