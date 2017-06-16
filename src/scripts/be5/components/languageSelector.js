import React from 'react';
import be5 from '../be5';
 
import '../../../css/languageSelector.css';

var Language = React.createClass({displayName: "Language",
  onClick(e) {
    this.props.onLanguageClick(this.props.code);
  },
  
  render() {
    if (this.props.selected) {
      return (
        React.DOM.div({className: "language selectedLanguage"}, 
          this.props.code
        )
      );
    }
    return (
      React.DOM.div({className: "language", onClick: this.onClick}, 
        this.props.code
      )
    );
  }
});

var LanguageList = React.createClass({displayName: "LanguageList",
  render: function() {
    var selected = this.props.data.selected;
    var onLanguageClick = this.props.onLanguageClick;
    var languageNodes = this.props.data.languages.map(function (language) {
      return (
        React.createElement(Language, {key: language, code: language, selected: language == selected, onLanguageClick: onLanguageClick})
      );
    });
    return (
      React.DOM.div({className: "languageList"}, 
        languageNodes
      )
    );
  }
});

export default React.createClass({
  displayName: 'LanguageBox',
  
  getInitialState() {
    return { data: { languages: [], selected: '' } };
  },
  
  componentDidMount() {
    this.refresh();
  },
  
  refresh() {
    be5.net.request('languageSelector', {}, function(data) {
        be5.locale.set(data.selected, data.messages);
        this.setState({ data: {selected: data.selected, languages: data.languages} });
      }.bind(this));
  },
  
  changeLanguage(language) {
    be5.net.request('languageSelector/select', { language: language }, function(data) {
        this.setState({ data: {selected: data.selected, languages: data.languages} });
        be5.locale.set(language, data.messages);
      }.bind(this));
  },
  
  render() {
    return (
      React.DOM.div({className: "languageBox"}, 
        React.createElement(LanguageList, {data: this.state.data, onLanguageClick: this.changeLanguage})
      )
    );
  }
});
