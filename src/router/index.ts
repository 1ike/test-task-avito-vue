import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';
import config from '@/config';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:id',
    name: 'Story',
    // route level code-splitting
    // this generates a separate chunk (story.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "story" */ '../views/Story.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(config.BASE_URL),
  routes,
});

export default router;
