import React          from 'react';
import renderer       from 'react-test-renderer';
import FormWizard     from '../../../../src/scripts/be5/components/FormWizard';
import be5            from '../../../../src/scripts/be5/be5';


test('test', () => {
  const steps = [
    {title: "Companies", url: '#!text/A'},
    {title: "EgissoDocs", url: '#!text/B'},
  ];

  const component = renderer.create(
    <FormWizard steps={steps}
                backButtonText={be5.messages.backButtonText}
                nextButtonText={be5.messages.nextButtonText}
    />
  );

  expect(component.toJSON()).toMatchSnapshot();

  //changeDocument('MainDocument', { value: "Page loaded." } );
  //expect(component.toJSON()).toMatchSnapshot();
});
