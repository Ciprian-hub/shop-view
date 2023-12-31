import {createRouter, createWebHistory} from "vue-router";
import OrderView from '../views/Orders/OrderView.vue'
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import store from "../store/index.js";
import AppLayout from "../components/AppLayout.vue";
import Products from '../views/Products/Products.vue'
import Orders from "../views/Orders/Orders.vue";
import Users from "../views/Users/Users.vue";
import Customers from "../views/Customers/Customers.vue";

const routes = [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        name: 'app',
        component: AppLayout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'dashboard',
                name: 'app.dashboard',
                component: Dashboard
            },
            {
                path: 'products',
                name: 'app.product',
                component: Products
            },
            {
                path: 'orders',
                name: 'app.orders',
                component: Orders
            },
            {
                path: 'orders/:id',
                name: 'app.order.view',
                component: OrderView
            },
            {
                path: 'users',
                name: 'app.users',
                component: Users
            },
            {
                path: 'customers',
                name: 'app.customers',
                component: Customers
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/request-password',
        name: 'requestPassword',
        component: RequestPassword,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPassword,
        meta: {
            requiresGuest: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.user.token){
        next({name: 'login'})
    }
    else if (to.meta.requiresGuest && store.state.user.token) {
        next({name: 'app.dashboard'})
    }
    else {
        next()
    }
})

export default router