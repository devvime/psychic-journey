class JsonError extends Error {
  constructor(message, status = 500, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
      status: this.status,
      ...this.details
    };
  }
}

global.JsonError = JsonError;
export default JsonError;