import axiosClient from "../axios";

// export function getCurrentUser ({commit}, data) {
//     return axiosClient.get('/user', data)
//         .then(({data}) => {
//             commit('setUser', data)
//             return data
//         })
// }

export function getUser({commit}, data) {
    return axiosClient.get('/user', data)
        .then(({data}) => {
            commit('setUser', data)
            return data
        })
}

export function login ({commit}, data) {
    return axiosClient.post('/login', data)
        .then(({data}) => {
            commit('setUser', data.user)
            commit('setToken', data.token)
            return data;
        })
}

export function logout ({commit}) {
    return axiosClient.post('/logout')
        .then((res) => {
            commit('setToken', null)
            return res
        })
}

export function getProducts({commit}, {url = null, search = '', perPage = 10, sort_field, sort_direction} = {}) {
    commit('setProducts', [true])
    url = url || '/products';
    return axiosClient.get(url, {
        params: {
            search,
            per_page: perPage,
            sort_field,
            sort_direction
        }
    })
        .then((res)=> {
            commit('setProducts', [false, res.data])
        })
        .catch(() => {
            commit('setProducts', [false])
        })
}

export function createProduct({commit}, product) {
    if(product.image instanceof File) {
        const form = new FormData()
        form.append('title', product.title)
        form.append('image', product.image)
        form.append('description', product.description)
        form.append('price', product.price)
        product = form
    }
    return axiosClient.post('/products', product)
}

export function updateProduct({commit}, product) {
    const id = product.id
    if(product.image instanceof File) {
        const form = new FormData()
        form.append('id', product.id)
        form.append('title', product.title)
        form.append('image', product.image)
        form.append('description', product.description)
        form.append('price', product.price)
        form.append('_method', 'PUT')
        product = form
    } else {
        product._method = 'PUT'
    }
    return axiosClient.post(`/products/${id}`, product)
}

export function getProduct({commit}, id) {
    return axiosClient.get(`/products/${id}`)
}

export function deleteProduct({commit}, id) {
    return axiosClient.delete(`/products/${id}`)
}

export function getOrders({commit}, {url = null, search = '', perPage = 10, sort_field, sort_direction} = {}) {
    commit('setOrders', [true])
    url = url || '/orders';
    return axiosClient.get(url, {
        params: {
            search,
            per_page: perPage,
            sort_field,
            sort_direction
        }
    })
        .then((res)=> {
            commit('setOrders', [false, res.data])
        })
        .catch(() => {
            commit('setOrders', [false])
        })
}
