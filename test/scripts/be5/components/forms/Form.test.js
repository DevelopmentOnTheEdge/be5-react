import React          from 'react';
import renderer       from 'react-test-renderer';
import Form           from '../../../../../src/scripts/be5/components/forms/Form';


test('Form', () => {
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

  const  component = renderer.create(
    <Form value={json}/>
  );
  expect(component.toJSON()).toMatchSnapshot();
});