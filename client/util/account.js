import axios from "axios";
import { SERVER_URL } from '@env';
// const SERVER_URL = "http://192.168.4.13:8080"

export async function sendConsumerRegisterRequest(email, password, ph) {
    const response = await axios.post(`${SERVER_URL}/api/account/register`, {
        email: email,
        password: password,
        ph: ph
    });
    return response.data;
}

export async function sendSellerRegisterRequest(email, password, storeName) {
    const response = await axios.post(`${SERVER_URL}/api/account/register`, {
        email: email,
        password: password,
        RSTR_ID: storeName
    });
    return response.data;
}

export async function sendLoginRequest(email, password) {
    const response = await axios.post(`${SERVER_URL}/api/account/auth`, {
        email: email,
        password: password
    });
    return response.data;
}

export async function getStoreFavRequest(email) {
    const response = await axios.get(`${SERVER_URL}/api/account/getFav?email=` + email);
    return response.data;
}

export async function addStoreFavRequest(email, storeId) {
    const response = await axios.post(`${SERVER_URL}/api/account/addFav`, {
        email: email,
        rstrId: storeId
    });
    return response.data;
}
export async function removeStoreFavRequest(email, storeId) {
    const response = await axios.post(`${SERVER_URL}/api/account/removeFav`, {
        email: email,
        rstrId: storeId
    });
    return response.data;
}