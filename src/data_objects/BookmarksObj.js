import axios from "axios";
import ApiHandler from "#data_objects/ApiHandler";

export default class BookmarksObj extends ApiHandler {
    apiUrlBase = 'http://localhost:5011/api/users/'

    constructor(data) {
        super();
        if (data) this.mapData(data);
    }

    mapData(jsonData) {
        this.data = {
            url: jsonData.url,
            user: jsonData.user,
            tconst: jsonData.tconst,
            nconst: jsonData.nconst,
            title: jsonData.title,
            personName: jsonData.personName,

        };
        this.loading = false;
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

    async getBookmarkPerson(nconst, user_id, jwt) {
        try {
            const res = await axios.get(this.apiUrlBase + user_id + "/bookmarks/person/" + nconst,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                })
            this.data = res.data;
            this.loading = false;
        } catch (error) {
            this.error = error;
            this.loading = false;
        }
    }

    async getBookmarkTitle(tconst, user_id, jwt) {
        try {
            const res = await axios.get(this.apiUrlBase + user_id + "/bookmarks/title/" + tconst, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            });

            this.data = res.data;
            this.loading = false;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Bookmark not found, handle it gracefully
                this.data = null; // or another appropriate value
            } else {
                // Other errors
                this.error = error;
            }
            this.loading = false;
        }
    }

    async addBookmark(identifier, user_id, jwt, isPerson) {
        let url;
        (isPerson)
            ? url = `http://localhost:5011/api/users/${user_id}/bookmarks/person`
            : url = `http://localhost:5011/api/users/${user_id}/bookmarks/title`;
        console.log(url)
        try {
            await axios.post(
                url,
                {"TitlePersonId": identifier},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
        } catch (error) {
            this.error = error;
        }
        this.loading = false;
    }


}