import React from 'react';
import be5 from '../../../../src/scripts/be5/be5';
import '../../../../src/scripts/be5/routes/login';
import '../../../../src/scripts/be5/routes/logout';
import '../../../../src/scripts/be5/routes/form';
import '../../../../src/scripts/be5/routes/table';
import '../../../../src/scripts/be5/routes/static';
import '../../../../src/scripts/be5/routes/categories';
import '../../../../src/scripts/be5/routes/queryBuilder';
import {getRoute} from "../../../../src/scripts/be5/core/routes";
import {MAIN_DOCUMENT} from "../../../../src/scripts/be5/constants";

jest.mock("../../../../src/scripts/be5/services/forms", () => ({
  __esModule: true, // this property makes it work
  default: {load: jest.fn()},
  _request: jest.fn(),
  getOperationInfo: jest.fn(),
  openOperationByUrl: jest.fn()
}));
import forms, {getOperationInfo, openOperationByUrl} from "../../../../src/scripts/be5/services/forms";


test('login, logout', () => {
  getRoute('login')();
  expect(openOperationByUrl.mock.calls.length).toBe(1);
  expect(openOperationByUrl.mock.calls[0]).toEqual(
    ["form/users/All records/Login", {"documentName": "MAIN_MODAL_DOCUMENT"}]);

  getRoute('logout')();
  expect(openOperationByUrl.mock.calls.length).toBe(2);
  expect(openOperationByUrl.mock.calls[1]).toEqual(
    ["form/users/All records/Logout", {"documentName": "MAIN_DOCUMENT"}]);
});

test('form', () => {
  getRoute('form')(MAIN_DOCUMENT, "users", "All records", "Test",{});
  expect(getOperationInfo.mock.calls.length).toBe(1);
  expect(forms.load.mock.calls.length).toBe(1);
});

test('table', () => {
  be5.net.request = jest.fn();

  getRoute('table')(MAIN_DOCUMENT, "users", "All records", {});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "query": "All records",
      "contextParams": "{}"
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('static', () => {
  be5.net.request = jest.fn();

  getRoute('static')(MAIN_DOCUMENT, "users.be");

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "static/users.be", {
      "_ts_": expect.any(Number),
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('categories', () => {
  be5.net.request = jest.fn();

  getRoute('categories')(MAIN_DOCUMENT, "users");

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "categories/forest/", {
      "entity": "users",
    },
    expect.any(Function)
  ]);
});

test('queryBuilder', () => {
  be5.net.request = jest.fn();

  getRoute('queryBuilder')(MAIN_DOCUMENT, {});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "queryBuilder", {
      "contextParams": "{}",
      "_ts_": expect.any(Number),
    },
    expect.any(Function)
  ]);
});
