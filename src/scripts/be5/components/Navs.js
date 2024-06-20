import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Document from '../containers/Document';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { processHashUrlForDocument } from "../utils/documentUtils";
import be5 from "../be5";

const Navs = (props) => {
  const {
    tabs,
    pills,
    vertical,
    navbar,
    tag,
    onOpenNav,
    steps,
    startAtStep,
    baseUrl,
    parentDocumentName,
    documentName
  } = props;

  const [compState, setCompState] = useState(startAtStep);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (baseUrl !== undefined && compState !== startAtStep) {
      setCompState(startAtStep);
      init();
    }
  }, [baseUrl, startAtStep]);

  const init = () => {
    processHashUrlForDocument(steps[compState].url, documentName);
  };

  const setNavState = (e) => {
    if (!e.ctrlKey) {
      e.preventDefault();
      const id = getIDbyUrl(e.target.getAttribute("href"));

      if (onOpenNav !== undefined) onOpenNav(id);

      if (baseUrl !== undefined && getUrl(id) !== be5.url.get()) {
        processHashUrlForDocument(getUrl(id), parentDocumentName);
      } else {
        processHashUrlForDocument(e, documentName);
        setCompState(id);
      }
    }
  };

  const getUrl = (id) => {
    if (id === 0)
      return "#!" + baseUrl;
    else
      return "#!" + baseUrl + "/" + id;
  };

  const getIDbyUrl = (url) => {
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].url === url) return i;
    }
    return 0;
  };

  const renderSteps = () => {
    return steps.map((s, i) => (
      <NavItem key={"NavItem" + i}>
        <NavLink
          href={steps[i].url}
          active={i === compState}
          onClick={setNavState}
          key={"NavLink" + i}
        >
          {steps[i].title}
        </NavLink>
      </NavItem>
    ));
  };

  const navProps = {
    tabs,
    pills,
    vertical,
    navbar,
    tag
  };

  return (
    <div className="navs-component">
      <Nav {...navProps}>
        {renderSteps()}
      </Nav>
      <div className="tab-content">
        <Document frontendParams={{ documentName }} />
      </div>
    </div>
  );
};

Navs.defaultProps = {
  startAtStep: 0,
  documentName: "navs",
};

Navs.propTypes = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  vertical: PropTypes.bool,
  navbar: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onOpenNav: PropTypes.func,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  startAtStep: PropTypes.number,
  baseUrl: PropTypes.string,
  parentDocumentName: PropTypes.string,
  documentName: PropTypes.string
};

export default Navs;