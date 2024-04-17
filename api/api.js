import SearchController from "../api/Controllers/SearchController";
import UserController from "../api/Controllers/UserController";
import RequestHolder from "../api/RequestHolder";

export default class API extends RequestHolder { 
    constructor(request) {
        super(request)
        this.search = new SearchController(request);
        this.user = new UserController(request);
    }
}