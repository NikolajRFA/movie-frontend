import axios from "axios";

class User {
    apiUrl = "http://localhost:5011/api/users/";

    constructor() {
        this.data = null;
        this.loading = true;
        this.error = null;
    }
    fetchData(id){
        axios.get(this.apiUrl+id).then(res=>{
            this.data = res.data;
            this.loading = false;
            console.log("test")
        }).catch(error => {
            this.error = error;
        })
    }

    async updateUser(id, updatedUserData) {
        try {
            const res = await axios.put(this.apiUrl+id, updatedUserData);
            this.data = res.data;
        } catch (error) {
            this.error = error;
        }
    }
}

export default User;