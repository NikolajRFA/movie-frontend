import axios from "axios";
import ApiHandler from "./ApiHandler";

export default class DropdownTitles extends ApiHandler {
    static apiUrlBase = 'http://localhost:5011/api/titles/'

    constructor(data = null) {
        super();
        if (data) this.mapData(data);
    }

    mapData(jsonData) {
        let personUrls = [];
        if (Array.isArray(jsonData)) {
            this.data = jsonData.map(movie => ({
                url: movie.url,
                title: movie.title,
                startYear: movie.startYear,
                personDtos: movie.personDtos
                    .filter(person => {
                        if (!personUrls.some(inner => inner === person.url)) {
                            personUrls.push(person.url);
                            return true;
                        }
                    })
                    .map(person => ({
                    url: person.url,
                    name: person.name
                })),
                poster: movie.poster
            }));
            this.loading = false;
            this.error = null;
        } else {
            this.error = 'Invalid data format';
            this.loading = false;
        }
    }

    static async fetchDropdown(searchPhrase, dropdownSize = 3) {
        const apiUrl = `${this.apiUrlBase}dropdown?q=${searchPhrase}&dropdownSize=${dropdownSize}`;
        const res = await axios.get(apiUrl);

        return new DropdownTitles(res.data);
    }
}