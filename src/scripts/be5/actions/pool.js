import changeDocument from 'be5/core/changeDocument';
import 'be5/components/pool';

export default () => {
  changeDocument({ type: 'pool', value: {}});
};
