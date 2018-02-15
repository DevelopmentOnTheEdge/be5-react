import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import bus            from '../../../../src/scripts/be5/core/bus';
import App            from '../../../../src/scripts/be5/components/Application';
import testUtils      from '../testUtils'

test('snapshot', () => {
  testUtils.mockBe5();

  const component = renderer.create(
    <App />
  );
  expect(component.toJSON()).toMatchSnapshot();

  bus.fire("LoggedIn");
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

