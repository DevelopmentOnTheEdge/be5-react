import changeDocument from 'be5/core/changeDocument';
import be5            from 'be5/be5';
import StaticPage     from 'be5/components/staticPage';

export default function(page) {
  be5.net.request('static/' + page, {}, data => {
    changeDocument({ type: 'static', value: data })
  });
};