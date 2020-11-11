class ReqError {
    constructor(message, error) {
        this.status = "faild";
        this.message = message;
        this.error = error;
    }
}

module.exports = ReqError