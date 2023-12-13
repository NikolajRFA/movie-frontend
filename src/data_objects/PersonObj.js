import ApiHandler from "#data_objects/ApiHandler";
import axios, {Axios} from "axios";

export default class PersonObj extends ApiHandler{
    apiBase = "http://localhost:5011/api/persons/";
    constructor() {
        super();
        this.getPerson = nconst => {
            axios.get(this.apiBase + nconst)
                .then(res => this.mapData(res.data))
                .catch(err => this.error = err);
            this.loading = false;
        }
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
    }
}