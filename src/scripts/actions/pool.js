import changeDocument from 'be5/changeDocument';
import 'components/pool';

export default () => {
  changeDocument({ type: 'pool', value: {}});
};
