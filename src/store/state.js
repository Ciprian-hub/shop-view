import {PRODUCTS_PER_PAGE} from "../constants";

export default {
    user: {
        token: sessionStorage.getItem('TOKEN'),
        data: {}
    },
    products: {
        loading: false,
        data: [],
        links: [],
        from: null,
        to: null,
        page: 1,
        limit: null,
        total: null
    },
    orders: {
        loading: false,
        data: [],
        links: [],
        from: null,
        to: null,
        page: 1,
        limit: null,
        total: null
    },
    users: {
        loading: false,
        data: [],
        links: [],
        from: null,
        to: null,
        page: 1,
        limit: null,
        total: null
    },
    countries: [],
    customers: {
        loading: false,
        data: [],
        links: [],
        from: null,
        to: null,
        page: 1,
        limit: null,
        total: null
    },
    dateOptions: [
        {key: "2d", text: "Last day"},
        {key: "1wk", text: "Last Week"},
        {key: "2wk", text: "Last 2 Weeks"},
        {key: "1m", text: "Last Month"},
        {key: "3m", text: "Last 3 Months"},
        {key: "6m", text: "Last 6 Months"},
        {key: "all", text: "All Time"}
    ]
}