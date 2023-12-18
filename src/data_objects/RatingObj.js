import axios from "axios";
import ApiHandler from "#data_objects/ApiHandler";
import Cookies from "js-cookie";

export default class RatingObj extends ApiHandler {
    constructor(data = null) {
        super();
        if (data) this.mapData(data);
    }

    static async get(tconst) {
        let rating = new RatingObj();
        try {
            const res = await axios.get(`${ApiHandler.url}users/${Cookies.get('id')}/ratings/${tconst}`);
            rating.mapData(res.data);
            rating.loading = false;
        } catch (e) {
            rating.error = e;
        }

        return rating;
    }

    static async post(tconst, rating) {
        try {
            await axios.post(`${ApiHandler.url}users/${Cookies.get('id')}/ratings`, {
                tconst,
                rating
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async put(tconst, rating) {
        try {
            await axios.put(`${ApiHandler.url}users/${Cookies.get('id')}/ratings`, {
                tconst,
                rating
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async delete(tconst) {
        try {
            await axios.delete(`${ApiHandler.url}users/${Cookies.get('id')}/ratings?tconst=${tconst}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    mapData(jsonData) {
        this.data = {
            url: jsonData.url,
            tconst: jsonData.tconst,
            title: jsonData.title,
            user: jsonData.user,
            rating: jsonData.rating,
            date: jsonData.date
        }
    }
}