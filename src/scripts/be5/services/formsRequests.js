import be5 from '../be5';
import {TIMESTAMP_PARAM} from "../constants";
import 'formdata-polyfill';

export const _get = (operationInfo, callback, failure) => {
  const data = Object.assign({}, operationInfo, {
    [TIMESTAMP_PARAM]: new Date().getTime()
  });

  $.ajax({
    url: be5.net.url('form'),
    data: data,
    success(data) {
      callback(data)
    },
    error(xhr, status, error) {
      const response = JSON.parse(xhr.responseText);
      failure(response);
    }
  });
};

export const _post = (action, data, callback, failure) => {
  $.ajax({
    url: be5.net.url(action),
    method: 'POST',
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    success(data) {
      callback(data)
    },
    error(xhr, status, error) {
      const response = JSON.parse(xhr.responseText);
      failure(response);
    }
  });
};
