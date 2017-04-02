import bus from 'be5/core/bus';

export default value => bus.fire('DocumentChange', value);
