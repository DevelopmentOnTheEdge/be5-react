import React    from 'react';
import renderer from 'react-test-renderer';
import Menu     from  '../../../../src/scripts/be5/components/menu/Menu';
import NavbarMenu from  '../../../../src/scripts/be5/components/menu/NavbarMenu';
import {getTestUser} from "../testUtils";


it('snapshot menu', () => {
  const menu = {"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":false,"title":"Добро пожаловать"},{"children":[{"action":{"arg":"login","name":"call"},"default":false,"title":"Вход"}],"default":false,"id":{"_en_":"users"},"title":"Пользователи"},{"children":[{"action":{"arg":"table/welfareGroups/Муниципальные услуги","name":"call"},"default":false,"title":"Муниципальные услуги"}],"default":false,"id":{"_en_":"_welfareGroups_"},"title":"Услуги"}]}
  // be5.net.request = function (path, attr, callback) {
  //   callback()
  // };

  const component = renderer.create(
    <Menu currentRoles={["Guest"]} menu={menu} fetchMenu={()=>{}}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('snapshot NavbarMenu', () => {
  const navbarMenu = {"root":[{"action":{"arg":"static/welcome.be","name":"call"},"default":true,"id":{"_en_":"_welcome_","_qn_":"All records"},"title":"Добро пожаловать"},{"children":[{"action":{"arg":"table/testtable/Test 1D","name":"call"},"default":false,"id":{"_en_":"testtable","_qn_":"Test 1D"},"title":"Test 1D"},{"action":{"arg":"table/testtable/Test 1D unknown","name":"call"},"default":false,"id":{"_en_":"testtable","_qn_":"Test 1D unknown"},"title":"Test 1D unknown"}],"default":false,"id":{"_en_":"testtable"},"title":"Test table"},{"action":{"arg":"table/users/All records","name":"call"},"default":false,"id":{"_en_":"users","_qn_":"All records"},"operations":[{"action":{"arg":"form/users/All records/Insert","name":"call"},"id":{"_en_":"users","_on_":"Insert"},"title":"Добавить"}],"title":"Пользователи"},{"action":{"arg":"logout","name":"call"},"default":false,"id":{"_en_":"_logout_","_qn_":"All records"},"title":"Выход"}]}

  //for prevent error - Tooltip cannot find ID
  const div = document.createElement('div');
  div.setAttribute("id", "RoleSelector");
  document.body.appendChild(div);

  const component = renderer.create(
    <NavbarMenu user={getTestUser()} menu={navbarMenu} fetchMenu={()=>{}} toggleRoles={()=>{}}/>
  );

  expect(component.toJSON()).toMatchSnapshot();

  // changeDocument('MAIN_DOCUMENT', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});
