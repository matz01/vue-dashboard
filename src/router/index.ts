import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/eventi/:id',
      name: 'evento',
      component: () => import('../views/EventoView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      // i campi custom in `meta` sono il modo standard per attaccare dati
      // a una rotta e leggerli nei navigation guard
      meta: { requiresAuth: true },
    },
    {
      path: '/forbiddne',
      name: 'forbidden',
      component: () => import('../views/ForbiddenView.vue'),
    },
    {
      // catch-all: deve restare l'ultima rotta dell'array, altrimenti
      // intercetterebbe anche i path validi definiti dopo di lei
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

// guard globale: gira prima di ogni navigazione. Ritornare una route
// location (invece di chiamare `next()`) è la sintassi consigliata da
// Vue Router 4+ per reindirizzare o bloccare la navigazione.
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.loggedIn) {
    return { name: 'forbidden' }
  }
})

export default router
