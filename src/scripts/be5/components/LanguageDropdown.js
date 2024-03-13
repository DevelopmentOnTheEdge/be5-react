import PropTypes from 'prop-types';
import React from 'react';
import be5 from '../be5';
import classNames from 'classnames';
import {fetchMenu, fetchUserInfo, MAIN_DOCUMENT} from "..";
import {LanguageSelector} from './LanguageSelector'

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  onClick(e) {
    this.props.onLanguageClick(this.props.code);
  };

  render() {
    if (this.props.selected) {
      return (
        <div className={"language selectedLanguage"}>{this.props.code}</div>
      );
    }
    return (
      <div className={"language"} onClick={this.onClick}>{this.props.code}</div>
    );
  }
}

Language.propTypes = {
  onLanguageClick: PropTypes.func.isRequired
};

class LanguageList extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let selected = this.props.data.selected;
    selected = selected ? selected.toUpperCase() : selected;
    const onLanguageClick = this.props.onLanguageClick;
    const languageNodes = this.props.data.languages.map((language) =>
      <Language key={language} code={language} selected={language.toUpperCase() === selected} onLanguageClick={onLanguageClick}/>
    );
    return (
      <div className={"languageList"}>{languageNodes}</div>
    );
  }
}


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
          <select className="form-control" name="languages" onChange={() => this.changeLanguage()}>
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
