import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import store from "../store/index.js";
import AppLayout from "../components/AppLayout.vue";

const routes = [
    {
        path: '/app',
        name: 'app',
        redirect: 'app/dashboard',
        component: AppLayout,
        meta: {
            requestAuth: true
        },
        children: [
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: Dashboard
            },
            // {
            //     path: 'products',
            //     name: 'app.product',
            //     component: Products
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/request-password',
        name: 'requestPassword',
        component: RequestPassword,
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPassword,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requestAuth && !store.state.user.token){
        next({name: 'login'})
    }
    else if (to.meta.requestGuest && store.state.user.token) {
        next({name: 'app.dashboard'})
    } else {
        next()
    }
})

export default router