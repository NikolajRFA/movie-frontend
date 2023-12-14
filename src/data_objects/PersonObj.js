import ApiHandler from "#data_objects/ApiHandler";
import axios, {Axios} from "axios";
import TitleListObj from "#data_objects/TitleListObj";

export default class PersonObj extends ApiHandler {
    apiBase = "http://localhost:5011/api/persons/";

    constructor(data = null) {
        super();
        if (data) this.mapData(data);
    }

    getPerson = async (nconst) => {
        let res;
        try {
            res = await axios.get(this.apiBase + nconst);
        } catch (error) {
            this.error = error;
            this.loading = false;
        }

        return new PersonObj(res.data);
    }


    mapData(jsonData) {
        this.data = {
            url: jsonData.url,
            name: jsonData.name,
            birthYear: jsonData.birthYear,
            deathYear: jsonData.deathYear,
            nameRating: jsonData.nameRating,
            professions: jsonData.professions.map(item => item.profession),
            titlesUrl: jsonData.titlesUrl
        }
        this.loading = false;
    }

    getTitles(url = null) {
        if (url) return TitleListObj.getTitleList(url);
        return TitleListObj.getTitleList(this.data.titlesUrl + '?pageSize=4');
    }
}