import {fetchMenu}  from '../../../../src/scripts/be5/store/actions/menuActions'
import {getMenu}  from '../../../../src/scripts/be5/store/selectors/menuSelectors'
import be5 from '../../../../src/scripts/be5/be5';
import testUtils from "../testUtils";


test('test updateUserInfo', () => {
  const menu = {"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":false,"title":"Добро пожаловать"},{"children":[{"action":{"arg":"login","name":"call"},"default":false,"title":"Вход"}],"default":false,"id":{"entity":"users"},"title":"Пользователи"},{"children":[{"action":{"arg":"table/welfareGroups/Муниципальные услуги","name":"call"},"default":false,"title":"Муниципальные услуги"}],"default":false,"id":{"entity":"_welfareGroups_"},"title":"Услуги"}]}
  be5.net.request = function (path, attr, callback) {
    callback(menu)
  };

  const store = testUtils.getStore();

  expect(getMenu(store.getState()))
    .toEqual(null);

  store.dispatch(fetchMenu());

  expect(getMenu(store.getState()))
    .toEqual(menu);
});
