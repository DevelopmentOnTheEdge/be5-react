import React from 'react';
import renderer from 'react-test-renderer';
import StaticPage from '../../../../src/scripts/be5/components/staticPage';

test('snapshot', () => {
    const pageContent = "<h1>Static page<h1>test content"
    const tree = renderer.create(
        <StaticPage value={pageContent} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
