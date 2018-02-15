import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Property             from './Property';
import JsonPointer          from 'json-pointer';

class PropertySet extends Component {

  _createGroup(curGroup, curGroupId, curGroupName) {
    return (
      <div className='property-group col-12' key={curGroupId} ref={curGroupId}>
        <div className='property-groop-box'>
          <h3>{curGroupName}</h3>
          <div className="row">
            {curGroup}
          </div>
        </div>
      </div>
    );
  }

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
    let curGroup = [];
    let curGroupName = null, curGroupId = null;
    let fields = [];

    const finishGroup = () => {
      if(curGroup.length > 0) {
        if(curGroupId) {
          fields.push(this._createGroup(curGroup, curGroupId, curGroupName));
        } else {
          Array.prototype.push.apply(fields, curGroup);
        }
      }
      curGroup = [];
    };

    for(const path of this.props.bean.order) {
      const itemProps = this.get(path);

      const newGroupId = itemProps.meta.groupId || null;
      const newGroupName = itemProps.meta.groupName || null;
      if(newGroupId !== curGroupId) {
        finishGroup();
        curGroupName = newGroupName;
        curGroupId = newGroupId;
      }
      const field = (<Property {...itemProps} onChange={this.props.onChange} />);
      curGroup.push(field);
    }
    finishGroup();

    return (
      <div className="property-set row">
        {fields}
      </div>
    );
  }

}

PropertySet.defaultProps = {
  localization: {},
};

PropertySet.propTypes = {
  bean: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  localization: PropTypes.object
};

export default PropertySet;
