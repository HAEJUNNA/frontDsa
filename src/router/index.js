import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/RegisterView.vue';
import LoginMenu from '../views/LoginView.vue';
import MainMenu from '../views/MainMenu.vue';
import EndPage from '../views/RegisterEndView.vue';

const routes = [
  {
    path: '/',
    component: LoginMenu,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    // path: '/menu:userid', //파라미터 넘길시에 /menu:paramKey1/:paramKey2
    path: '/menu',
    name: 'mainmenu',
    component: MainMenu,
    meta: {
      roles: ['LEVEL_2'], // 접근권한
    },
  },
  {
    path: '/end',
    component: EndPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
