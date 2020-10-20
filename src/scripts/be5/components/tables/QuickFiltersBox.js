import React from 'react';
import PropTypes from "prop-types";
import be5 from "../../be5";

const propTypes = {
    data: PropTypes.shape({
        attributes: PropTypes.array,
        type: PropTypes.string
    }),
    url: PropTypes.string
};

const QuickFiltersBox = ({data, url}) => {
    if (!data || !data.attributes || !data.attributes.quickFilterInfo || !data.attributes.quickFilterInfo.length === 0) return null;

    const pUrl = be5.url.parse(url);
    const rows = [];
    data.attributes.quickFilterInfo.forEach((quickFilter, idx) => {
        const {title, param, tags} = quickFilter;

        const named = Object.assign({}, pUrl.named);
        delete named[param];

        let url = be5.url.create(pUrl.positional, named);
        let row = [];

        if (pUrl.named[param] === undefined) {
            row.push(<span key={`${title} ${param} all ${idx}`}>{be5.locale.msg('All')}</span>)
        } else {
            row.push(<a key={`${title} ${param} all ${idx}`} href={"#!" + url}>{be5.locale.msg('All')}</a>)
        }
        tags.forEach(tag => {
            url = be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, {[param]: tag[0]}));
            if (pUrl.named[param] === tag[0]) {
                row.push(<span key={`${url} ${idx}`} className="ml-2">{tag[1]}</span>)
            } else {
                row.push(<a key={`${url} ${idx}`} href={"#!" + url} className="ml-2">{tag[1]}</a>)
            }
        });

        if (row.length > 1) {
            rows.push(<div key={`${title} ${param} ${idx}`} className="d-block mb-2">{title}: {row}</div>)
        }
    })
    return rows.length > 0 ? <div className="quickfilters-box">{rows}</div> : null;
}
export default QuickFiltersBox;
