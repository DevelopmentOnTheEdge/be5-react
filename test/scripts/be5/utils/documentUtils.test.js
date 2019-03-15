import {getSelfUrl} from '../../../../src/scripts/be5/utils/documentUtils';
import testData from '../testData.json';

test('getSelfUrl', () => {
  expect(getSelfUrl(testData.simpleForm))
    .toEqual("form/companies/Selection view SelectCompany/SelectCompany");

  expect(getSelfUrl(testData.jsonApiError))
    .toEqual("table/testtable/Test 1D2");

});
