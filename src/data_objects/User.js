import axios from "axios";
import Cookies from "js-cookie";

class User {
    apiUrl = "http://localhost:5011/api/users/";

    constructor() {
        this.data = null;
        this.loading = true;
        this.error = null;
        this.getCookies();
    }

    getCookies() {
        this.id = Cookies.get('id');
        this.jwt = Cookies.get('token');
    }

    async fetchData(id) {
        try {
            const res = await axios.get(this.apiUrl + id);
            this.data = res.data;
            this.loading = false;
        } catch (error) {
            this.error = error;
            this.loading = false;
        }
    }

    static updateUser = async (user, id, updatedUserData, jwt) => {
        try{
            const res = await axios.put(
                user.apiUrl + id,
                updatedUserData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
        } catch (e){
            user.error = e;
        }

    };


}

export default User;