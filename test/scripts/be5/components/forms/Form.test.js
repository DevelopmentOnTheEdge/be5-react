import React          from 'react';
import renderer       from 'react-test-renderer';
import Form           from '../../../../../src/scripts/be5/components/forms/Form';
import ModalForm           from '../../../../../src/scripts/be5/components/forms/ModalForm';
import SubmitOnChangeForm           from '../../../../../src/scripts/be5/components/forms/SubmitOnChangeForm';


test('Form', () => {

  const  component = renderer.create(
    <Form value={json} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ModalForm', () => {

  const  component = renderer.create(
    <ModalForm value={json} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('SubmitOnChangeForm', () => {

  const  component = renderer.create(
    <SubmitOnChangeForm value={json} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

const json = {

  "data": {
    "attributes": {
      "bean": {
        "values": {
          "companyID": ""
        },
        "meta": {
          "/companyID": {
            "displayName": "companyID"
          }
        },
        "order": [
          "/companyID"
        ]
      },
      "entity": "companies",
      "layout": {},
      "operation": "SelectCompany",
      "operationResult": {
        "status": "open"
      },
      "query": "Selection view SelectCompany",
      "selectedRows": "",
      "title": "SelectCompany"
    },
    "type": "form"
  },
  "links": {
    "self": "form/companies/Selection view SelectCompany/SelectCompany"
  },
  "meta": {
    "_ts_": "1507198229686"
  }

};