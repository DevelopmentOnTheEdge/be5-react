import React from 'react';
import classNames from 'classnames';
import {LanguageSelector} from './LanguageSelector'


class LanguageDropdown extends LanguageSelector {

  constructor(props) {
    super(props);
  };

  render() {
    if (this.state.data && this.state.data.languages.length <= 1) {
      return null;
    }
    return (
        <div className={classNames('languageDropdown', this.props.className)}>
          <select className="form-control" name="languages" onChange={this.changeLanguage}>
            {
              this.state.data.languages.map((language) => 
              <option value={language}> {language} </option>)
            }
          </select>
        </div>
    );
  }
}



export default LanguageDropdown;
