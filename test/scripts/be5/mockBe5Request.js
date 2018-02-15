import be5            from '../../../src/scripts/be5/be5';

be5.locale.set = () => {};

be5.net.request = function (path, attr, callback) {
  if (path === 'menu') {
    callback({"loggedIn":true,"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":false,"title":"Добро пожаловать"},{"children":[{"action":{"arg":"login","name":"call"},"default":false,"title":"Вход"}],"default":false,"id":{"entity":"users"},"title":"Пользователи"},{"children":[{"action":{"arg":"table/welfareGroups/Муниципальные услуги","name":"call"},"default":false,"title":"Муниципальные услуги"}],"default":false,"id":{"entity":"_welfareGroups_"},"title":"Услуги"}]});
    return;
  }

  if (path === 'languageSelector') {
    callback({"languages":["RU"],"messages":{"no":"нет","yes":"да","fio":"Ф.И.О."},"selected":"RU"});
    return;
  }

  if (path === 'roleSelector') {
    callback({"availableRoles":[],"selectedRoles":[]});
    return;
  }
};
