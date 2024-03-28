import { ShowTypingInterface } from '@/interfaces/typing.interface';
import { UserInterface } from '@/interfaces/user.interface';
import { removeUserData, setUserData } from '@/services/user';
import { createStore } from 'vuex';

interface RootState {
  showModal: boolean,
  showLoading: boolean
  user: UserInterface,
  showTyping: ShowTypingInterface
}

export default createStore<RootState>({
  
  state(){
    const user: UserInterface = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '') : {};
    return {
      showModal: false,
      showLoading: false,
      user: user,
      showTyping: {
        user: {
          isAnonymous: true,
          userName: '',
          channelName: ''
        },
        isTyping: false
      }
    }
  },
  
  getters: {
    getUserData(state){
      return state.user
    },
  },

  mutations: {
    setShowModal(state, show: boolean) {
      state.showModal = show;
    },
    setShowLoading(state, show: boolean) {
      state.showLoading = show;
    },
    setUser(state, user: UserInterface) {
      state.user = user;
    },
    setShowTyping(state, isTyping: ShowTypingInterface) {
      state.showTyping = isTyping;
    },
  },

  actions: {
    handleShowModal({ commit }, payload: { showModal: boolean }){
      commit('setShowModal', payload.showModal);
    },

    handleShowLoading({ commit }, payload: { showLoading: boolean }){
      commit('setShowLoading', payload.showLoading);
    },
    handleLogin({commit}, user: UserInterface){
      setUserData(user);
      commit('setUser', user);
    },

    handleLogout(){
      removeUserData();
    },

    handleShowTyping({commit}, isTyping: ShowTypingInterface){
      commit('setShowTyping', isTyping);
    }
  },
  modules: {
    
  }
})
