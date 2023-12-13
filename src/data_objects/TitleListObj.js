import ApiHandler from "#data_objects/ApiHandler";
import TitleObj from "#data_objects/TitleObj";
import axios from "axios";

export default class TitleListObj extends ApiHandler {
    constructor(jsonData = null) {
        super();
        if (jsonData) this.mapData(jsonData);
    }

    mapData(jsonData) {
        this.data = {
            total: jsonData.total,
            numberOfPages: jsonData.numberOfPages,
            next: jsonData.next,
            prev: jsonData.prev,
            current: jsonData.current,
            items: jsonData.items.map(title => new TitleObj(title))
        }
        this.loading = false;
    }

    static async getTitleList(apiUrl) {
        let res;
        try {
            res = await axios.get(apiUrl);
        } catch (error) {
            this.error = error;
            this.loading = false;
        }

        return new TitleListObj(res.data);
    }
}