import axios from "axios";
import ApiHandler from "./ApiHandler";

export default class TitleObj extends ApiHandler {
    apiUrlBase = 'http://localhost:5011/api/titles/'
    constructor() {
        super();
    }

    mapData(jsonData) {
        this.data = {
            url: jsonData.url,
            title: jsonData.title,
            aliases: jsonData.aliases,
            titleType: jsonData.titleType,
            episodes: jsonData.episodes,
            poster: jsonData.poster,
            startYear: jsonData.startYear,
            endYear: jsonData.endYear,
            isAdult: jsonData.isAdult,
            runTimeMinutes: jsonData.runTimeMinutes,
            averageRating: jsonData.averageRating,
            numVotes: jsonData.numVotes,
            plot: jsonData.plot,
            genres: jsonData.genres.map(genre => genre.genre),
            crew: jsonData.crew
        };
    }

    async getTitle(tconst) {
        try {
            const res = await axios.get(this.apiUrlBase + tconst);
            this.mapData(res.data);
            this.loading = false;
        } catch (error) {
            this.error = error;
            this.loading = false;
        }
    }
}