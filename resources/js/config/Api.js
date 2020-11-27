import axios from "axios";
import Token from "./Token";

const BASE_API = process.env.VUE_APP_API || '/api';

const request = axios.create({
    baseURL: BASE_API,
    headers: {
        Authorization: Token.get() ? `Bearer ${Token.get()}` : "",
        'X-Requested-With': 'XMLHttpRequest',
        ContentType: 'application/json',
    }
});

request.interceptors.response.use((response) => {
    // if (DEBUG) console.log(response.config.url, response);
    if(response.data.status == "Token is Expired") {
        console.log("Token is expired");
        sessionStorage.removeItem('_token');
        window.location.href = "/login"
    }

    return response;
});


const Api = {
    request: request,
};

export default Api;