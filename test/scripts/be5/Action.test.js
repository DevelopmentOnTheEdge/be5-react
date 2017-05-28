import React from 'react';
import Action from '../../../src/scripts/be5/components/action';

test('test call', () => {
    const link = {'name':'call','arg':'table/test'};
    const action = Action.parse(link);

    expect(action.href).toEqual('#!table/test');
    expect(action.target).toEqual('');
});

test('test open', () => {
    const link = {'name':'open','arg':'table/test'};
    const action = Action.parse(link);

    expect(action.href).toEqual('table/test');
    expect(action.target).toEqual('_blank');
});

test('test throw', () => {
    const link = {'name':'unknown','arg':'table/test'};

    expect(() => {
        Action.parse(link);
    }).toThrow();
});
