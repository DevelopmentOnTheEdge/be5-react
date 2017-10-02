import bus from './bus';

export default (documentName, value) => {
  //console.log(documentName, value);
  bus.fire(documentName, value);
}
