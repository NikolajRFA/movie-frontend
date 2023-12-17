// abstract class
export default class ApiHandler {
    static url = 'http://localhost:5011/api/';
    constructor() {
        this.data = null;
        this.loading = true;
        this.error = null;
    }
}