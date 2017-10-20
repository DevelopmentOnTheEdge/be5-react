import React    from 'react';
import renderer from 'react-test-renderer';
import SplitPane     from  '../../../../src/scripts/be5/components/splitPane';
import be5 from '../../../../src/scripts/be5/be5';

it('snapshot menu', () => {

  const component = renderer.create(
    <SplitPane split="vertical" defaultSize={280} >
      <div/>
      <div/>
    </SplitPane>
  );

  expect(component.toJSON()).toMatchSnapshot();
});