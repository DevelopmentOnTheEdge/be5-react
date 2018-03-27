import bus from './bus';
import Preconditions    from '../utils/preconditions';


const changeDocument = (documentName, value) => {
  Preconditions.passed(documentName);
  bus.fire(documentName, value);
};

export default changeDocument;