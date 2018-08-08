import React          from 'react';
import be5            from '../../../../src/scripts/be5/be5';
import '../../../../src/scripts/be5/routes/login';
import '../../../../src/scripts/be5/routes/logout';
import '../../../../src/scripts/be5/routes/form';
import '../../../../src/scripts/be5/routes/table';
import '../../../../src/scripts/be5/routes/static';
import '../../../../src/scripts/be5/routes/categories';
import '../../../../src/scripts/be5/routes/queryBuilder';
import {getRoute} from "../../../../src/scripts/be5/core/routes";


test('login', () => {
  be5.net.request = jest.fn();

  getRoute('login')();

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "form", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Login",
      "operationParams": '{}',
      "query": "All records",
      "values": "{}"
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('logout', () => {
  be5.net.request = jest.fn();

  getRoute('logout')();

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "form", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Logout",
      "operationParams": '{}',
      "query": "All records",
      "values": "{}"
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('form', () => {
  be5.net.request = jest.fn();

  getRoute('form')(be5.MAIN_DOCUMENT, "users", "All records", "Test",{});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "form", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Test",
      "operationParams": '{}',
      "query": "All records",
      "values": "{}"
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('table', () => {
  be5.net.request = jest.fn();

  getRoute('table')(be5.MAIN_DOCUMENT, "users", "All records", {});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "query": "All records",
      "values": "{}"
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('static', () => {
  be5.net.request = jest.fn();

  getRoute('static')(be5.MAIN_DOCUMENT, "users.be");

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "static/users.be", {
      "_ts_": expect.any(Number),
    },
    expect.any(Function)
  ]);
});

test('categories', () => {
  be5.net.request = jest.fn();

  getRoute('categories')(be5.MAIN_DOCUMENT, "users");

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

  getRoute('queryBuilder')(be5.MAIN_DOCUMENT, {});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "queryBuilder", {
      "values": "{}",
      "_ts_": expect.any(Number),
    },
    expect.any(Function)
  ]);
});
