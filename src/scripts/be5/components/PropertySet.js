import React, { Component } from 'react';
import Property from './Property';
import JsonPointer from 'json-pointer';

class PropertySet extends Component {

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

    for(const item of this.props.fields.order) {
      var itemName = item.substring(item.lastIndexOf("/")+1);
      var itemMeta = this.props.fields.meta[item];
      var itemValue = JsonPointer.get(this.props.fields, "/values" + item);

      const newGroupId = itemMeta.groupId || null;
      const newGroupName = itemMeta.groupName || null;
      if(newGroupId !== curGroupId) {
        finishGroup();
        curGroupName = newGroupName;
        curGroupId = newGroupId;
      }
      const field = (<Property meta={itemMeta} name={itemName} value={itemValue} path={item}
                               key={itemName} ref={itemName} onChange={this.props.onChange}/>);
      curGroup.push(field);
    }
    finishGroup();

    return (
      <div className="property-set">
        {fields}
      </div>
    );
  }

  _createGroup(curGroup, curGroupId, curGroupName) {
    return (
      <div className='property-group' key={curGroupId} ref={curGroupId}>
        <h3>{curGroupName}</h3>
        {curGroup}
      </div>
    );
  }

}

export default PropertySet;
