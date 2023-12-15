import ApiHandler from "./ApiHandler";
import axios from "axios";
import Cookies from "js-cookie";

export default class SearchResultsObj extends ApiHandler {
    static apiUrlBase = 'http://localhost:5011/api/titles/'

    constructor(data = null) {
        super();
        if (data) this.mapData(data);
    }

    // Method to map JSON to this.data
    mapData(jsonData) {
        this.data = {
            total: jsonData.total,
            numberOfPages: jsonData.numberOfPages,
            next: jsonData.next,
            prev: jsonData.prev,
            current: jsonData.current,
            items: jsonData.items.map(item => ({
                endYear: item.endYear,
                titleType: item.titleType,
                url: item.url,
                title: item.title,
                startYear: item.startYear,
                personDtos: [...new Map(item.personDtos.map(person => [person.name, person])).values()],
                poster: item.poster
            }))
        };
        this.loading = false;
    }

    static async fetchResults(searchPhrase, page = 0, pageSize = 10) {
        const apiUrl = `${this.apiUrlBase}results?q=${searchPhrase}&page=${page}&pageSize=${pageSize}`;
        let res;
        // User is logged in
        if (Cookies.get('token')) {
            res = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
        } else {
            res = await axios.get(apiUrl);
        }

        return new SearchResultsObj(res.data);
    }
}