import be5 from 'be5';
import changeDocument from 'be5/changeDocument';
import 'components/customServlet';

export default function(params) {
  $.ajax(be5.def.URL_PREFIX+'legacyServlet/' + params.path).done(function(data) {
    changeDocument({ type: 'servlet', value: data });
  });
};
