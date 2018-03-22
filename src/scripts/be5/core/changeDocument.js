import bus from './bus';
import Preconditions    from '../utils/preconditions';

export default (documentName, value) => {
  Preconditions.passed(documentName);
  bus.fire(documentName, value);
}
