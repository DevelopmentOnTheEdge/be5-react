import bus from './bus';

export default (documentName, value) => bus.fire(documentName, value);
