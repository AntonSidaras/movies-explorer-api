const userModelConstants = {
  modelName: 'user',
  selectPasswordField: '+password',
  wrongUserNameOrPassword: 'Неправильные почта или пароль',
};

const movieModelConstants = {
  modelName: 'movie',
};

const appConstants = {
  atlasFakeUser: 'atlas-user',
  atlasFakePassword: 'atlas-password',
  errorMessageDefault: 'На сервере произошла ошибка',
};

const common = {
  isNotA: 'не является',
  emailString: 'email',
  urlString: 'URL',
};

const corsPolicyConstants = {
  message: 'Политика CORS для этого сайта не разрешает доступ из указанного источника.',
};

export {
  common,
  appConstants,
  userModelConstants,
  movieModelConstants,
  corsPolicyConstants,
};
