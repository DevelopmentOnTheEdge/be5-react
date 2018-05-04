import be5            from '../../../src/scripts/be5/be5';

be5.locale.set = () => {};

be5.net.request = function (path, attr, callback) {
  if (path === 'menu') {
    callback({"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":false,"title":"Добро пожаловать"},{"children":[{"action":{"arg":"login","name":"call"},"default":false,"title":"Вход"}],"default":false,"id":{"entity":"users"},"title":"Пользователи"},{"children":[{"action":{"arg":"table/users/TestQuery","name":"call"},"default":false,"title":"Test query"}],"default":false,"id":{"entity":"_welfareGroups_"},"title":"Услуги"}]});
    return;
  }

  if (path === 'menu/withIds') {
    callback();
    return;
  }

  if (path === 'languageSelector') {
    callback({"languages":["RU"],"messages":{"no":"нет","yes":"да","fio":"Ф.И.О."},"selected":"RU"});
    return;
  }

  if (path === 'roleSelector') {
    callback({"availableRoles":[],"currentRoles":[]});
    return;
  }

  if (path === 'appInfo') {
    callback({"URL":"http://localhost:8200/","title":"Test App"});
    return;
  }

  if (path === 'static/welcome.be') {
    callback({"data":{"attributes":{
      "content":"<h1>Добро пожаловать</h1>\n<a class=\"\" href=\"#!login\">Вход</a>","title":""},"type":"static"},
      "links":{"self":"static/welcome.be"},
      "meta":{"_ts_":"1518775214702"}});
    return;
  }


};
