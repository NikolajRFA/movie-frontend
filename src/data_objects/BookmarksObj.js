import axios from "axios";

export default class BookmarksObj {
    apiUrlBase = 'http://localhost:5011/api/users/'

    constructor() {
        this.data = null;
        this.loading = true;
        this.error = null;
    }

    async getBookmarks(id, jwt) {
        try {
            const res = await axios.get(this.apiUrlBase + id + "/bookmarks",
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                });
            this.data = res.data;
            this.loading = false;
        } catch
            (error) {
            this.error = error;
            this.loading = false;
        }
    }
}