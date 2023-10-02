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
      roles: ['LEVEL_2', 'LEVEL_3', 'LEVEL_4'], // 접근권한
    },
  },
  {
    path: '/end',
    component: EndPage,
  },
  {
    // path: '*', // '*' 의 의미는 위에서 어떤 경로와도 매칭이 되지 않은 경우 /404로 redirect를 한다.
    // Vue 3에서부터 default 값과의 매칭이 pathMatch 로 바뀌었다.
    path: '/:pathMatch(.*)*',
    redirect: '/',
    // 바로 NotFound 경로를 매칭해도 되고 redirect를 에러페이지를 따로설정해서 만들어도된다.
    //  redirect: '/404,
    // component: NotFound
  },
  // { // 스프링부트에서 error컨트롤러를 설정해줬다는 가정하에 가능하다.
  //   path: '/404',
  //   name: 'notFound',
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
