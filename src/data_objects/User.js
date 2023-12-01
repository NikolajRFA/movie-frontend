import axios from "axios";
class User {
    constructor() {
        this.data = null;
        this.loading = true;
        this.error = null;
    }
    async fetchData(id) {
        try {
            const res = await axios.get(`http://localhost:5011/api/users/${id}`);
            this.data = res.data;
            this.loading = false;
        } catch (error) {
            this.error = error;
            this.loading = false;
        }
    }
}

export default User;