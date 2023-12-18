import ListObj from "#data_objects/ListObj";
import RatingObj from "#data_objects/RatingObj";
import axios from "axios";
import ApiHandler from "#data_objects/ApiHandler";
import Cookies from "js-cookie";

export default class RatingListObj extends ListObj {
    mapData(jsonData) {
        super.mapData(jsonData);
        this.data.items = jsonData.items.map(item => new RatingObj(item));
    }

    static async getImpl(url){
        const res = await axios.get(url);
        let ratings = new RatingListObj();
        ratings.mapData(res.data);
        ratings.loading = false;

        return ratings;
    }

    static async get(pageNo = 0, pageSize = 10) {
        return RatingListObj.getImpl(`${ApiHandler.url}users/${Cookies.get('id')}/ratings?page=${pageNo}&pageSize=${pageSize}`)
    }

    static async getNext(ratings) {
        return RatingListObj.getImpl(ratings.data.next);
    }

    static async getPrev(ratings) {
        return RatingListObj.getImpl(ratings.data.prev);
    }
}