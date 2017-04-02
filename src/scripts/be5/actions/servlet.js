import be5 from 'be5/be5';
import changeDocument from 'be5/core/changeDocument';
import 'be5/components/customServlet';

export default function(params) {
  $.ajax(be5.def.URL_PREFIX+'legacyServlet/' + params.path).done(function(data) {
    changeDocument({ type: 'servlet', value: data });
  });
};
