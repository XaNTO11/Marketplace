/**
 * Service class for authenticating users against an API
 * and storing JSON Web Tokens in the browser's LocalStorage.
 */
import jwtDecode from "jwt-decode"

class AuthService {
    TOKEN_KEY = "token";
    
    constructor(auth_api_url) {
        this.auth_api_url = auth_api_url;
    }

    async login(username, password) {
        const res = await this.fetch(this.auth_api_url, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        });
        let json = await res.json();
        if (res.status === 404) {
            throw Error(json.msg);
        }
        this.setToken(json.token);

        return json;
    }

    
    getDecodedToken(){
        return this.getToken() && jwtDecode(this.getToken())
    }

    loggedIn() {
        let token = this.getToken();
        if(!token)
            return false;

        let decodedToken = this.getDecodedToken();
      
       return decodedToken.exp < Date.now();  
    }

    setToken(token) {
        if(token){
            localStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    getUsername() {
        let token = this.getDecodedToken();
        if(token)
            return token.username;
    }

    getAdmin() {
        let token = this.getDecodedToken();
        if(token)
            return token.admin;
    }

    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        });
    }
}

export default AuthService;
