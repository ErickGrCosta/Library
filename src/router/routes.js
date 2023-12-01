import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/livros",
    name: "Books",
    component: () => import("../views/Books.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
