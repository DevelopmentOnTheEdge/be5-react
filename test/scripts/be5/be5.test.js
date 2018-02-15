import React from 'react';
import renderer from 'react-test-renderer';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import {shallow, mount, render} from 'enzyme';

import be5            from '../../../src/scripts/be5/be5';
import changeDocument from '../../../src/scripts/be5/core/changeDocument';
import App            from '../../../src/scripts/be5/components/Application';
import SplitPane            from '../../../src/scripts/be5/components/SplitPane';
import SideBar            from '../../../src/scripts/be5/components/SideBar';
import Document            from '../../../src/scripts/be5/components/Document';
import StaticPage            from '../../../src/scripts/be5/components/StaticPage';
import ActionFrom            from '../../../src/scripts/be5/actions/form';
import AlertContainer from 'react-alert'

test('snapshot', () => {
  mockBe5();

  const component = renderer.create(
    <App />
  );
  expect(component.toJSON()).toMatchSnapshot();
  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});


// test('test mount', () => {
//     mount(<App />);
// });
//
// test('test app', () => {
//   mockBe5();
//
//   const renderer = new ReactShallowRenderer();
//   renderer.render(<App />);
//
//   const result = renderer.getRenderOutput();
//   // expect(result.props.children.children).toEqual([
//   //     <SideBar ref="sideBar"/>,
//   //     <Document ref="document"/>
//   // ]);
//
//   const alertOptions = {
//     offset: 14,
//     position: 'top right',
//     theme: 'light',
//     time: 5000,
//     transition: 'fade',
//     icon: null
//   };
//   expect(result.props.children).toEqual([
//       <AlertContainer ref={a => this.msg = a} {...alertOptions } />,
//       <SplitPane split="vertical" defaultSize={280} >
//         <SideBar ref="sideBar"/>
//         <Document ref="document"/>
//       </SplitPane>
//   ]);
// });
//

function mockBe5() {
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
    console.log('fsd' + path);
  };
}