import SearchController from "../api/Controllers/SearchController";
import RequestHolder from "../api/RequestHolder";

export default class API extends RequestHolder { 
    constructor(request) {
        super(request)
        this.search = new SearchController(request);
    }
}