import React from 'react';
import actions from '../../../../src/scripts/be5/services/actions';

test('test call', () => {
    const link = {'name':'call','arg':'table/test'};
    const action = actions.parse(link);

    expect(action.href).toEqual('#!table/test');
    expect(action.target).toEqual('');
});

test('test open', () => {
    const link = {'name':'open','arg':'table/test'};
    const action = actions.parse(link);

    expect(action.href).toEqual('table/test');
    expect(action.target).toEqual('_blank');
});

test('test throw', () => {
    const link = {'name':'unknown','arg':'table/test'};

    expect(() => {
       actions.parse(link);
    }).toThrow();
});
