import be5 from 'be5';

export default {
  load(page, callback) {
    be5.net.request('static/' + page, {}, callback);
  }
};
