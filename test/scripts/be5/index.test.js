import './mockBe5Request'
import '../../../src/scripts/be5/index';
import '../../../src/scripts/be5/be5styles';
import be5init from '../../../src/scripts/be5/be5init';

test('test load', () => {
  be5init.init()
});
