import RequestHolder from "../RequestHolder";

export default class SearchRequestBase extends RequestHolder {
    constructor(request) {
        super(request);
        this.search = {
            headers: {},
            params: {}
        };
    }

    setNonceHeader(nonce) {
        this.search.headers['X-Request-Nonce'] = nonce;
        return this;
    }

    setSignatureHeader(signature) {
        this.search.headers['X-Request-Signature'] = signature;
        return this;
    }

    doCheck() {
        return this.search.headers['X-Request-Nonce'] !== undefined &&
               this.search.headers['X-Request-Signature'] !== undefined;
    }

    build() {
        if (this.doCheck()) {
            return this.search;
        } else {
            throw new Error("Error message: Some required headers are missing.");
        }
    }
}
