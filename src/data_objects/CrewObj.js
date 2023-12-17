import ListObj from "#data_objects/ListObj";
import axios from "axios";

export default class CrewObj extends ListObj {
    constructor() {
        super();
    }

    static async get(crewUrl, pageNo = 0, pageSize = 10) {
        const res = await axios.get(`${crewUrl}?page=${pageNo}&pageSize=${pageSize}`);
        let crew = new CrewObj();
        crew.mapData(res.data);
        crew.loading = false;

        return crew
    }

    static async getNext(crew) {
        const res = await axios.get(crew.data.next);
        let newCrew = new CrewObj();
        newCrew.mapData(res.data);
        newCrew.loading = false;

        return newCrew;
    }

    static async getPrev(crew) {
        const res = await axios.get(crew.data.prev);
        let newCrew = new CrewObj();
        newCrew.mapData(res.data);
        newCrew.loading = false;

        return newCrew;
    }

    mapData(jsonData) {
        super.mapData(jsonData);
        this.data.items = jsonData.items.map(item =>
            ({
                url: item.url,
                title: item.title,
                ordering: item.ordering,
                person: item.person,
                personName: item.personName,
                category: item.category,
                job: item.job,
                character: item.character
            })
        );
    }
}