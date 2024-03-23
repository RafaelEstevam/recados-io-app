import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BoardView from '../views/BoardView.vue';
import BoardViewV2 from '../views/BoardView-v2.vue';
import LoginView from '../views/LoginView.vue';
import Page404View from '../views/404View.vue';
import { getUserData } from '@/services/user';
import inputValidation from '@/utils/inputValidation';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/board-v1/:channel',
    name: 'boardV1',
    component: BoardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/board/:channel',
    name: 'board',
    component: BoardViewV2,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: Page404View,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = getUserData();

  const channelName = `${to.params.channel}`;
  const isValidChannel = inputValidation.hasSpaces(channelName);

  if((to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) || isValidChannel){
    next('/')
  }else{
    next();
  }
})

export default router
