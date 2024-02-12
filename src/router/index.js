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
import CustomerView from "../views/Customers/CustomerView.vue";
import CustomersReport from "../views/Reports/CustomersReport.vue";
import OrdersReport from "../views/Reports/OrdersReport.vue";
import Report from "../views/Reports/Report.vue";

const routes = [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        name: 'app',
        redirect: '/app/dashboard',
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
            {
                path: 'customers/:id',
                name: 'app.customer.view',
                component: CustomerView
            },
            {
                path: '/report',
                name: 'reports',
                component: Report,
                meta: {
                    requiresAuth: true
                },
                children: [
                    {
                        path: 'orders/:date?',
                        name: 'reports.orders',
                        component: OrdersReport
                    },
                    {
                        path: 'customers/:date?',
                        name: 'reports.customers',
                        component: CustomersReport
                    },
                ]
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
    routes,
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