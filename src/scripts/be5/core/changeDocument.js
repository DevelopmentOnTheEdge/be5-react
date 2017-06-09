import bus from './bus';

export default value => bus.fire('DocumentChange', value);
