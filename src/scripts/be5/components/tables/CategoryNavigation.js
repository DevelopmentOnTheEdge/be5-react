import React from 'react';
import PropTypes from 'prop-types';
import be5 from "../../be5";


const propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.array,
    type: PropTypes.string
  }),
  url: PropTypes.string
};

const CategoryNavigation = ({data, url}) => {
  if (!data || !data.attributes || data.attributes.length === 0) return null;
  const categories = data.attributes;

  const pUrl = be5.url.parse(url);
  const currentCat = pUrl.named['_cat_'];

  if (currentCat === undefined) {
    return (
      <div className="category-navigation category-navigation__not-select">
        <a href={be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, {_cat_: categories[0].id}))}>
          {be5.locale.msg('Switch to categorized view')}
        </a>
      </div>
    )
  }

  const row = [];

  function tableTd(categories) {
    return categories.map(function (cat) {
      if (parseInt(currentCat) !== cat.id) {
        return (
          <a className="d-block"
             href={be5.url.create(pUrl.positional, Object.assign({}, pUrl.named, {_cat_: cat.id}))} key={cat.id}>
            {cat.name}
          </a>
        )
      } else {
        return (
          <span className="d-block" key={cat.id}>
            {cat.name}
          </span>
        )
      }
    })
  }

  function tableRow(categories, lvl) {
    const td = (
      <td key={lvl}>
        {tableTd(categories)}
      </td>
    );
    row.push(td);
    if (categories.length === 1 && categories[0].children !== undefined && categories[0].children.length > 0) {
      row.push((
        <td key={"nav" + lvl}>
          <span>-></span>
        </td>
      ));
      tableRow(categories[0].children, lvl + 1);
    }
  }

  tableRow(categories, 0);

  return (
    <div className="category-navigation">
      <table>
        <tbody>
        <tr>
          {row}
        </tr>
        </tbody>
      </table>
    </div>
  );
};

CategoryNavigation.propTypes = propTypes;

export default CategoryNavigation;
