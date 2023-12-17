import axios from "axios";
import ApiHandler from "./ApiHandler";

export default class TitleObj extends ApiHandler {
    static apiUrlBase = `${ApiHandler.url}titles/`
    constructor(data) {
        super();
        if (data) this.mapData(data);
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
        this.loading = false;
    }

    static async getTitle(tconst) {
        let title;
        try {
            const res = await axios.get(TitleObj.apiUrlBase + tconst);
            title = new TitleObj(res.data);
            title.loading = false;
        } catch (error) {
            title.error = error;
            title.loading = false;
        }

        return title;
    }
}