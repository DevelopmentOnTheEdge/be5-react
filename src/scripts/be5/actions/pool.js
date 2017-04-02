import changeDocument from 'be5/core/changeDocument';
import 'components/pool';

export default () => {
  changeDocument({ type: 'pool', value: {}});
};
