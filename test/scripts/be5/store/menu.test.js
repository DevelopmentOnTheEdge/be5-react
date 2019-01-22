import {fetchMenu}  from '../../../../src/scripts/be5/store/actions/menu.actions'
import {getMenu}  from '../../../../src/scripts/be5/store/selectors/menu.selectors'
import be5 from '../../../../src/scripts/be5/be5';
import {getTestStore} from "../testUtils";


test('test updateUserInfo', () => {
  const menu = {"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":false,"title":"Добро пожаловать"},{"children":[{"action":{"arg":"login","name":"call"},"default":false,"title":"Вход"}],"default":false,"id":{"_en_":"users"},"title":"Пользователи"},{"children":[{"action":{"arg":"table/welfareGroups/Муниципальные услуги","name":"call"},"default":false,"title":"Муниципальные услуги"}],"default":false,"id":{"_en_":"_welfareGroups_"},"title":"Услуги"}]}
  be5.net.request = function (path, attr, callback) {
    callback(menu)
  };

  const store = getTestStore();

  expect(getMenu(store.getState()))
    .toEqual(null);

  store.dispatch(fetchMenu());

  expect(getMenu(store.getState()))
    .toEqual(menu);
});
