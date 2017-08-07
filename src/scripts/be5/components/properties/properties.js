import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Property             from './property';
import JsonPointer          from 'json-pointer';

class Properties extends Component {

  get(path){
    const itemName = path.substring(path.lastIndexOf("/")+1);
    const itemMeta = this.props.bean.meta[path];
    const itemValue = JsonPointer.get(this.props.bean, "/values" + path);
    return {
      meta: itemMeta,
      name: itemName,
      value: itemValue,
      path: path,
      key: itemName + "Property",
      ref: itemName + "Property",
      localization: this.props.localization
    }
  }

  render() {
//    let curGroup = [];
//    let curGroupName = null, curGroupId = null;
    let fields = this.props.bean.order.map((path, i)=> {
      if(this.props.ids === undefined || this.props.ids.includes(i)){
        return(
         <Property {...this.get(path)} onChange={this.props.onChange} />
        )
      }else{
        return null;
      }
    });

    return <div>{fields}</div>;
  }

}

Properties.defaultProps = {
  localization: {},
};

Properties.propTypes = {
  bean: PropTypes.object.isRequired,
  ids: PropTypes.array,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

export default Properties;
