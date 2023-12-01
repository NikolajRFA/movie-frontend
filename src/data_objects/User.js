import axios from "axios";

class User {
    apiUrl = "http://localhost:5011/api/users/";
    constructor() {
        this.data = null;
        this.loading = true;
        this.error = null;
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

    updateUser = async (id, updatedUserData) => {
        try {
            const res = await axios.put(this.apiUrl+id, updatedUserData);
            this.data = res.data;
        } catch (error) {
            this.error = error;
        }
    }


}

export default User;