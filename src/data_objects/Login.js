import axios from "axios";
import Cookies from "js-cookie";
import {useContext} from "react";
import {AuthContext} from "#AuthContext";


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
        }
    }
}

export default Login;