import bus from './bus';
import Preconditions    from '../preconditions';

export default (documentName, value) => {
  Preconditions.passed(documentName);
  bus.fire(documentName, value);
}
