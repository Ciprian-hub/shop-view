export function setUser(state, user) {
    state.user.data = user
}

export function setToken(state, token) {
    state.user.token = token
    if(token) {
        sessionStorage.setItem('TOKEN', token)
    } else {
        sessionStorage.removeItem('TOKEN')
    }
}

export function setProducts(state, [loading, response = null]) {
    if(response){
        state.products = {
            data: response.data,
            links: response.meta.links,
            total: response.meta.total,
            from: response.meta.from,
            to: response.meta.to,
            limit: response.meta.per_page,
            page: response.meta.current_page
        }
    }
}

export function setUsers(state, [loading, response = null]) {
    if(response){
        state.users = {
            data: response.data,
            links: response.meta.links,
            total: response.meta.total,
            from: response.meta.from,
            to: response.meta.to,
            limit: response.meta.per_page,
            page: response.meta.current_page
        }
    }
}

export function setCustomers(state, [loading, response = null]) {
    if(response){
        state.customers = {
            data: response.data,
            links: response.meta.links,
            total: response.meta.total,
            from: response.meta.from,
            to: response.meta.to,
            limit: response.meta.per_page,
            page: response.meta.current_page
        }
    }
}

export function setOrders(state, [loading, response = null]) {
    if(response){
        state.orders = {
            ...state.orders,
            data: response.data,
            links: response.meta?.links,
            total: response.meta?.total,
            from: response.meta?.from,
            to: response.meta?.to,
            limit: response.meta?.per_page,
            page: response.meta?.current_page
        }
    }
}

export function setCountries(state, countries) {
    state.countries = countries
}