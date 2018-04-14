import React    from 'react';
import renderer from 'react-test-renderer';
import Menu     from  '../../../../src/scripts/be5/components/menu/Menu';
import NavbarMenu from  '../../../../src/scripts/be5/components/menu/NavbarMenu';


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

test('snapshot NavbarMenu', () => {
  const navbarMenu = {"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":true,"id":{"entity":"_welcome_","query":"All records"},"title":"Добро пожаловать"},{"children":[{"action":{"arg":"table/testtable/Test 1D","name":"call"},"default":false,"id":{"entity":"testtable","query":"Test 1D"},"title":"Test 1D"},{"action":{"arg":"table/testtable/Test 1D unknown","name":"call"},"default":false,"id":{"entity":"testtable","query":"Test 1D unknown"},"title":"Test 1D unknown"}],"default":false,"id":{"entity":"testtable"},"title":"Test table"},{"action":{"arg":"table/users/All records","name":"call"},"default":false,"id":{"entity":"users","query":"All records"},"operations":[{"action":{"arg":"form/users/All records/Insert","name":"call"},"id":{"entity":"users","operation":"Insert"},"title":"Добавить"}],"title":"Пользователи"},{"action":{"arg":"logout","name":"call"},"default":false,"id":{"entity":"_logout_","query":"All records"},"title":"Выход"}]}

  const component = renderer.create(
    <NavbarMenu loggedIn={true} currentRoles={["Guest"]} menu={navbarMenu} fetchMenu={()=>{}}/>
  );

  expect(component.toJSON()).toMatchSnapshot();

  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});