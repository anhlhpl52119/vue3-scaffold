import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { ERouteName } from '@/enums/ERoute';

type ICustomRouteRecord = Omit<RouteRecordRaw, 'name'> & { name: ERouteName };

const routesRecord: ICustomRouteRecord[] = [
  {
    path: '/',
    name: ERouteName.Home,
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: ERouteName.About,
    component: () => import('../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routesRecord as RouteRecordRaw[],
});
router.beforeEach((to, from, next) => {
  return next();
});
export default router;
