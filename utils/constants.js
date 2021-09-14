const userModelConstants = {
  modelName: 'user',
  selectPasswordField: '+password',
  wrongUserNameOrPassword: 'Неправильные почта или пароль',
};

const movieModelConstants = {
  modelName: 'movie',
};

const appConstants = {
  localhostDB: 'mongodb://localhost:27017/moviesdb',
};

const authConstants = {
  bearerStr: 'Bearer ',
  authRequired: 'Необходима авторизация',
  sameKeyWarning: `!!!ВНИМАНИЕ!!! В продакшне 
  используется тот же секретный ключ, что и в режиме разработки.`,
  okMessage: 'Всё в порядке. Секретные ключи отличаются',
  errMessage: 'Что-то не так.',
  jwtError: 'JsonWebTokenError',
  jwtErrorMessage: 'invalid signature',
};

const common = {
  secretDev: 'secret',
  isNotA: 'не является',
  emailString: 'email',
  urlString: 'URL',
  developmentMode: 'development',
  productionMode: 'production',
  pathSignIn: '/signin',
  pathSignUp: '/signup',
  pathSignOut: '/signout',
};

const errorNameConstants = {
  castErrorName: 'CastError',
  validationErrorName: 'ValidationError',
  mongoErrorName: 'MongoError',
};

const errorHandlerConstants = {
  errorMessageDefault: 'На сервере произошла ошибка',
};

const corsPolicyConstants = {
  message: 'Политика CORS для этого сайта не разрешает доступ из указанного источника.',
};

export {
  common,
  appConstants,
  authConstants,
  userModelConstants,
  movieModelConstants,
  corsPolicyConstants,
  errorHandlerConstants,
  errorNameConstants,
};
