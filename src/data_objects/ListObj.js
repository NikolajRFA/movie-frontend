import ApiHandler from "#data_objects/ApiHandler";

// abstract class.
export default class ListObj extends ApiHandler {
    constructor() {
        super();
    }

    mapData(jsonData) {
        this.data = {
            total: jsonData.total,
            numberOfPages: jsonData.numberOfPages,
            next: jsonData.next,
            prev: jsonData.prev,
            current: jsonData.current,
            items: null
        }
    }
}