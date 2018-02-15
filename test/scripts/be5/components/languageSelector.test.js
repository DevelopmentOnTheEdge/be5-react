import React    from 'react';
import renderer from 'react-test-renderer';
import LanguageSelector     from  '../../../../src/scripts/be5/components/LanguageSelector';
import be5 from '../../../../src/scripts/be5/be5';

it('snapshot menu', () => {

  be5.net.request = function (path, attr, callback) {
    callback({"languages":["en"],"messages":{"no":"нет","yes":"да","fio":"Ф.И.О."},"selected":"en"})
  };

  const component = renderer.create(
    <LanguageSelector />
  );

  expect(component.toJSON()).toMatchSnapshot();
});