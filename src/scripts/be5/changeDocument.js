import bus from 'be5/bus';

export default value => bus.fire('DocumentChange', value);
