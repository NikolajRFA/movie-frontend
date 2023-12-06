import axios from "axios";

export default class TitleObj {
    constructor() {
        this.loading = true;
        this.error = null;
    }

    async getTitle(tconst) {
        try {
            const res = await axios.get(this.apiUrlBase + tconst);
            this.data = res.data;
            this.loading = false;
        } catch (error) {
            this.error = error;
            this.loading = false;
        }
    }

    async fetchDropdownTitles(searchPhrase, dropdownSize = 5){
        const apiUrl = `${this.apiUrlBase}dropdown?=${searchPhrase}&dropdown=${dropdownSize}`;

        try {
            const res = await axios.get(apiUrl);
            this.data = res.data;
            this.title = res.data.title;
            this.loading = false;
        } catch (error) {
            this.error = error;
            this.loading = false;
        }
    }
}