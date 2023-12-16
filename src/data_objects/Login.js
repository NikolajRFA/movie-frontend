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

            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Rethrow to handle it in the component
        }
    }

    static async createAccount(username, email, password) {
        try {
            const response = await axios.post('http://localhost:5011/api/users', {
                username,
                email,
                password,
                role: 'User' // Default user role
            });

            await Login.performLogin(username, password);
            return response.data;
        } catch (error) {
            console.error('Account creation failed:', error);
            throw error;
        }
    }
}

export default Login;