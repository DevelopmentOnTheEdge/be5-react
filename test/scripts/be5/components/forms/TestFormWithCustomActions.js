import React from 'react';
import classNames from 'classnames';
import HorizontalForm from "../../../../../src/scripts/be5/components/forms/HorizontalForm";
import {registerDocument} from "../../../../../src/scripts/be5/core/registers/documents";


class TestFormWithCustomActions extends HorizontalForm
{
  _createFormActions() {
    const horizontalColSize = this.props.value.data.attributes.layout.horizontalColSize || 2;
    const colTag = 'col-lg-' + (12-horizontalColSize);
    const offsetTag = 'offset-lg-' + horizontalColSize;

    return (
      <div className="formActions row">
        <div className={classNames(colTag, offsetTag)}>
          {this._createSubmitAction('form/users/All records/Full filter', 'Find users')}{'  '}
          {this._createSubmitAction('form/groups/All records/Full filter', 'Find groups')}
        </div>
      </div>
    );
  }
}

registerDocument('TestFormWithCustomActions', TestFormWithCustomActions);

export default TestFormWithCustomActions;
