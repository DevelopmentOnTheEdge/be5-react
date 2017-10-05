import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/document';
import Form           from '../../../../src/scripts/be5/components/forms/form';
import Table           from '../../../../src/scripts/be5/components/tables/table';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';
import StaticPage     from '../../../../src/scripts/be5/components/staticPage';
import be5            from '../../../../src/scripts/be5/be5';

test('text', () => {
    const component = renderer.create(
        <Document />
    );

    expect(component.toJSON()).toMatchSnapshot();

    changeDocument('MainDocument', { component: 'text', value: "Page loaded." } );
    expect(component.toJSON()).toMatchSnapshot();
});

test('StaticPage', () => {
    const component = renderer.create(
        <Document />
    );

    changeDocument('MainDocument', { component: StaticPage,
            value: StaticPage.createValue("Test", 'test content')});
    expect(component.toJSON()).toMatchSnapshot();
});

test('Form', () => {
    const  component = renderer.create(
      <Document />
    );

    changeDocument('MainDocument', { component: Form,
            value: {
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
            }
    });
    expect(component.toJSON()).toMatchSnapshot();
});

test('Table', () => {
  const  component = renderer.create(
    <Document />
  );

  changeDocument('MainDocument', { component: Table,
    value: {
      "data": {
        "attributes": {
          "category": "companies",
          "columns": [
            "Наименование"
          ],
          "hasAggregate": false,
          "layout": {
            "type": "tableForm"
          },
          "length": 1,
          "operations": [
            {
              "clientSide": false,
              "isClientSide": false,
              "name": "Edit",
              "requiresConfirmation": false,
              "title": "Редактировать",
              "visibleWhen": "oneSelected"
            },
            {
              "clientSide": false,
              "isClientSide": false,
              "name": "Insert",
              "requiresConfirmation": false,
              "title": "Добавить",
              "visibleWhen": "always"
            }
          ],
          "page": "Общие сведения",
          "parameters": {},
          "rows": [
            {
              "cells": [
                {
                  "content": "adfd",
                  "options": {
                    "quick": {
                      "visible": "false"
                    }
                  }
                }
              ],
              "id": "19"
            }
          ],
          "selectable": true,
          "title": "Организации: Общие сведения",
          "totalNumberOfRows": 1
        },
        "type": "table"
      },
      "links": {
        "self": "table/companies/Общие сведения"
      },
      "meta": {
        "_ts_": "1507198487234"
      }
    }
  });
  expect(component.toJSON()).toMatchSnapshot();
});