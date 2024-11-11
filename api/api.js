import SearchController from "../api/Controllers/SearchController.js";
import UserController from "../api/Controllers/UserController.js";
import RequestHolder from "../api/RequestHolder.js";

export default class API extends RequestHolder { 
    constructor(request) {
        super(request)
        this.search = new SearchController(request);
        this.user = new UserController(request);
    }
}