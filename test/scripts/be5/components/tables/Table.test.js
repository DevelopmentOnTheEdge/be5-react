import React          from 'react';
import renderer       from 'react-test-renderer';
import Table           from '../../../../../src/scripts/be5/components/tables/Table';

test('Table', () => {

  const json = {
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
  };

  const  component = renderer.create(
    <Table value={json}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});