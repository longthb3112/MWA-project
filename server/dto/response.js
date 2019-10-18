class Response {
    constructor(data, msg, code) {
        this.data = data;
        this.status = data !== null ? 'OK' : 'ERR';
        this.httpStatus = data !== null ? 200 : code;
        this.error = data != null ? null : msg;
    }
}
module.exports = Response;