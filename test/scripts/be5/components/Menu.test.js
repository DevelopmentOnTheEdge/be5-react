import React    from 'react';
import renderer from 'react-test-renderer';
import Menu     from  '../../../../src/scripts/be5/components/menu/Menu';


it('snapshot menu', () => {
  const menu = {"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":false,"title":"Добро пожаловать"},{"children":[{"action":{"arg":"login","name":"call"},"default":false,"title":"Вход"}],"default":false,"id":{"entity":"users"},"title":"Пользователи"},{"children":[{"action":{"arg":"table/welfareGroups/Муниципальные услуги","name":"call"},"default":false,"title":"Муниципальные услуги"}],"default":false,"id":{"entity":"_welfareGroups_"},"title":"Услуги"}]}
  // be5.net.request = function (path, attr, callback) {
  //   callback()
  // };

  const component = renderer.create(
    <Menu currentRoles={["Guest"]} menu={menu} fetchMenu={()=>{}}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});