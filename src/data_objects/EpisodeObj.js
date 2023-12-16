import ListObj from "#data_objects/ListObj";
import axios from "axios";

export default class EpisodeObj extends ListObj {
    constructor() {
        super();
    }

    static async get(episodesUrl, pageNo = 0, season = 0) {
        const res = await axios.get(`${episodesUrl}?page=${pageNo}&pageSize=10&season=${season}`);
        let episodes = new EpisodeObj();
        episodes.mapData(res.data);
        this.loading = false;

        return episodes;
    }

    static async getNext(episodes) {
        const res = await axios.get(episodes.data.next);
        let newEpisodes = new EpisodeObj();
        newEpisodes.mapData(res.data);
        this.loading = false;

        return newEpisodes;
    }

    static async getPrev(episodes) {
        const res = await axios.get(episodes.data.prev);
        let newEpisodes = new EpisodeObj();
        newEpisodes.mapData(res.data);
        this.loading = false;

        return newEpisodes;
    }

    static async getNumberOfSeasons(episodes) {
        console.log(episodes);
        const res = await axios.get(episodes.data.current.replace(/(?<=Page=)\d+/, episodes.data.numberOfPages - 1));
        return res.data.items[res.data.items.length - 1].season;

    }

    mapData(jsonData) {
        super.mapData(jsonData);
        this.data.items = {
            parentUrl: jsonData.parentUrl,
            episodeUrl: jsonData.episodeUrl,
            title: jsonData.title,
            season: jsonData.season,
            episode: jsonData.episode
        }
    }
}