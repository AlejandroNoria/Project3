import axios from 'axios';

class API {

    constructor() {
        //this.baseURL = 'http://localhost:8080';
        this.baseURL = '';
        this.auth = {
            headers: {
                Authorization: ''
            }
        }
    }

    async search(query) {
        const data = await axios.get(`${this.baseURL}/api/item`, {
            params: {
                name: query || ''
            }
        });
        return data?.data?.data;
    }

    async login(credentials) {
        const data = await axios.post(`${this.baseURL}/users/login`, credentials);
        if (data.data.status === 'Success') {
            this.auth.headers.Authorization = `Bearer ${data.data.token}`;
            return {
                token: data.data.token,
                user: data.data.data
            }
        }
        else return false;
    }

    logout() {

    }

    async signup(formData) {
        const data = await axios.post(`${this.baseURL}/users/signup`, formData);
        return data;
    }

    async addToCart(item, token) {
        const data = await axios.post(`${this.baseURL}/api/cart`, {
            item, quantity: 1
        }, this.auth);

        if (data.data.status === 'Success') {
            return data.data.data.cart;
        }
        else return false;
    }

    async getCart() {
        const data = await axios.get(`${this.baseURL}/api/cart`, this.auth);

        if (data.data.status === 'Success') {
            return data.data.data;
        }

        else return false;

    }

    async removeFromCart(item) {
        const config = Object.assign({}, this.auth);
        config.data = { item }
        console.log(config);
        const data = await axios.delete(`${this.baseURL}/api/cart`, config);

        if (data.data.status === 'Success') {
            return data.data.data.cart
        }
        else return false;
    }


}

const api = new API();

export default api;
