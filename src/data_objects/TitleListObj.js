import TitleObj from "#data_objects/TitleObj";
import axios from "axios";
import ListObj from "#data_objects/ListObj";

export default class TitleListObj extends ListObj {
    mapData(jsonData) {
        super.mapData(jsonData);
        this.data.items = jsonData.items.map(title => new TitleObj(title))
        this.loading = false;
    }

    static async get(url, pageNo, pageSize) {
        console.log(url);
        const res = await axios.get(`${url}?page=${pageNo}&pageSize=${pageSize}`);
        let titles = new TitleListObj();
        titles.mapData(res.data);
        titles.loading = false;

        return titles;
    }

    static async getNext(titles) {
        const res = await axios.get(titles.data.next);
        let newTitles = new TitleListObj();
        newTitles.mapData(res.data);
        newTitles.loading = false;

        return newTitles;
    }

    static async getPrev(titles) {
        const res = await axios.get(titles.data.prev);
        let newTitles = new TitleListObj();
        newTitles.mapData(res.data);
        newTitles.loading = false;

        return newTitles;
    }
}