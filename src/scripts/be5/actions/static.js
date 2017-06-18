import be5            from '../be5';
import changeDocument from '../core/changeDocument';

be5.net.request('static/' + page, {}, data => {
    changeDocument({ type: 'static', value: data })
});