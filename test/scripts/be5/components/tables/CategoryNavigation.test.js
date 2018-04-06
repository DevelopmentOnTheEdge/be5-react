import React from 'react';
import renderer from 'react-test-renderer';
import CategoryNavigation from "../../../../../src/scripts/be5/components/tables/CategoryNavigation";


test('snapshot', () => {
  const json = [{"children":[{"children":[{"children":[],"id":5,"name":"c1"},{"children":[],"id":6,"name":"c2"}],"id":3,"name":"p1"}],"id":2,"name":"Root"}];

  const tree = renderer.create(
    <CategoryNavigation categories={json} url={"table/publications/Compact%20view/_cat_=3"} />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});