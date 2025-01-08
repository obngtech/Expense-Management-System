class APIerror extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status ?? 500;
  }
}

module.exports = APIerror;
