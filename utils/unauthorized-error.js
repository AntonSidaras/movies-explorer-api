class Unauthorized extends Error {
  constructor() {
    super();
    this.message = 'Необходима авторизация';
    this.statusCode = 401;
  }
}

export default Unauthorized;
