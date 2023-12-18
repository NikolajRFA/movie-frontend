import axios from "axios";
import ListObj from "#data_objects/ListObj";
import PersonObj from "#data_objects/PersonObj";
import ApiHandler from "#data_objects/ApiHandler";


export default class PersonListObj extends ListObj{

    mapData(jsonData){
        super.mapData(jsonData);
        this.data.items = jsonData.items.map(person => new PersonObj(person));
        this.loading = false;
    }
    static async getImpl(url){
        const res = await axios.get(url);
        let persons = new PersonListObj();
        persons.mapData(res.data);
        persons.loading = false;

        console.log(persons)
        return persons;
    }

    static async get(q, pageNo = 0, pageSize = 10) {
        return PersonListObj.getImpl(`${ApiHandler.url}persons/results?q=${q}&page=${pageNo}&pageSize=${pageSize}`)
    }

    static async getNext(persons) {
        return PersonListObj.getImpl(persons.data.next);
    }

    static async getPrev(persons) {
        return PersonListObj.getImpl(persons.data.prev);
    }


}