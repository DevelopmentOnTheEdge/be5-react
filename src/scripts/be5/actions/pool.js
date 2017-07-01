import be5            from '../be5';
import React          from 'react';
import changeDocument from '../core/changeDocument';
import PoolPage from '../components/pool';

export default function() {

  be5.net.request('pool', {}, () => {
    changeDocument({ component: PoolPage, value: {} })
  });

};
