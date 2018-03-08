import be5            from '../../../src/scripts/be5/be5';

be5.locale.set = () => {};

be5.net.request = function (path, attr, callback) {
  if (path === 'menu') {
    callback({"loggedIn":true,"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":false,"title":"Добро пожаловать"},{"children":[{"action":{"arg":"login","name":"call"},"default":false,"title":"Вход"}],"default":false,"id":{"entity":"users"},"title":"Пользователи"},{"children":[{"action":{"arg":"table/users/TestQuery","name":"call"},"default":false,"title":"Test query"}],"default":false,"id":{"entity":"_welfareGroups_"},"title":"Услуги"}]});
    return;
  }

  if (path === 'menu/withIds') {
    callback({"loggedIn":true,"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":true,"id":{"entity":"_welcome_","query":"All records"},"title":"Добро пожаловать"},{"children":[{"action":{"arg":"table/testtable/Test 1D","name":"call"},"default":false,"id":{"entity":"testtable","query":"Test 1D"},"title":"Test 1D"},{"action":{"arg":"table/testtable/Test 1D unknown","name":"call"},"default":false,"id":{"entity":"testtable","query":"Test 1D unknown"},"title":"Test 1D unknown"}],"default":false,"id":{"entity":"testtable"},"title":"Test table"},{"action":{"arg":"table/users/All records","name":"call"},"default":false,"id":{"entity":"users","query":"All records"},"operations":[{"action":{"arg":"form/users/All records/Insert","name":"call"},"id":{"entity":"users","operation":"Insert"},"title":"Добавить"}],"title":"Пользователи"},{"action":{"arg":"logout","name":"call"},"default":false,"id":{"entity":"_logout_","query":"All records"},"title":"Выход"}]});
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

  if (path === 'appInfo') {
    callback({"URL":"http://localhost:8200/","title":"Test App"});
    return;
  }

  if (path === 'menu/defaultAction') {
    callback({"arg":"static/welcome.be","name":"call"});
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
