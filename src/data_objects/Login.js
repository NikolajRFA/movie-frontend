import axios from "axios";
import Cookies from "js-cookie";

class Login {
    static async performLogin(username, password) {
        try {
            const response = await axios.post('http://localhost:5011/api/users/login', {
                username,
                password
            });

            const { token, id } = response.data;

            Cookies.set('token', token, { expires: 1/12 }); // Expires in 2 hours
            Cookies.set('id', id, { expires: 1/12 }); // Expires in 2 hours
        } catch (error) {
            this.error=error;
            throw error; // Rethrow to handle it in the component
        }
    }


    static async createAccount(username, email, password) {
        try {
             await axios.post('http://localhost:5011/api/users', {
                username,
                email,
                password,
                role: 'User' // Default user role
            });

            await Login.performLogin(username, password);
        } catch (error) {
            this.error=error;
        }
    }
}

export default Login;