import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Property             from './Property';
import JsonPointer          from 'json-pointer';

class Properties extends Component {

  static get(path, bean, localization){
    const itemName = path.substring(path.lastIndexOf("/")+1);
    const itemMeta = bean.meta[path];
    const itemValue = JsonPointer.get(bean, "/values" + path);
    return {
      meta: itemMeta,
      name: itemName,
      value: itemValue,
      path: path,
      key: itemName + "Property",
      ref: itemName + "Property",
      localization: localization
    }
  }

  render() {
    let fields = this.props.bean.order.map((path, i)=> {
      if(this.props.ids === undefined || this.props.ids.includes(i)){
        return(
         <Property {...Properties.get(path, this.props.bean, this.props.localization)} onChange={this.props.onChange} />
        )
      }else{
        return null;
      }
    });

    return <div className={this.props.className}>{fields}</div>;
  }

}

Properties.defaultProps = {
  className: "row",
  localization: {},
};

Properties.propTypes = {
  className: PropTypes.string.isRequired,
  bean: PropTypes.object.isRequired,
  ids: PropTypes.array,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

export default Properties;
