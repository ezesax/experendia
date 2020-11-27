import * as jwt from "jwt-decode";

const KEY = "_token";

const Token = {
    key: KEY,

    get() {
        return sessionStorage.getItem(KEY) || undefined;
    },

    set(token) {
        sessionStorage.setItem(KEY, token);
    },

    clear(){
        sessionStorage.removeItem(KEY)
    },

    getData() {
        let data = undefined;
        if (this.isAuth()) {
            data = jwt(this.get());
        }
        return data;
    },

    isExpired(data) {
        data = data || this.getData();
        return data && data.exp > Math.floor(new Date().getTime() / 1000);
    },

    isAuth() {
        return !!this.get();
    }
};

export default Token;
