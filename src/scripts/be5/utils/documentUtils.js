import React from 'react';
import be5 from "../be5";
import Preconditions from '../utils/preconditions';
import {GO_BACK, MAIN_DOCUMENT, MAIN_MODAL_DOCUMENT, OPEN_DEFAULT_ROUTE, TIMESTAMP_PARAM} from "../constants";
import FrontendAction from "../services/model/FrontendAction";
import {executeFrontendActions} from "../services/frontendActions";
import changeDocument from "../core/changeDocument";
import {clearDocumentState} from "../services/documentStates";

export const getResourceByID = (included, id) => {
  if (included === undefined) return undefined;

  for (let i = 0; i < included.length; i++) {
    if (included[i].id === id) return included[i];
  }
  return undefined;
};

export const getResourceByType = (included, type) => {
  if (included === undefined) return undefined;

  for (let i = 0; i < included.length; i++) {
    if (included[i].type === type) return included[i];
  }
  return undefined;
};

export const getModelByID = (included, meta, id) => {
  if (included === undefined) return undefined;

  const res = getResourceByID(included, id);
  if (res !== undefined) {
    return {data: res, included: included, meta: meta};
  }
  else {
    return undefined
  }
};

export const createStaticValue = (title, text, links, meta) => {
  Preconditions.passed(links.self);
  return {
    data: {
      type: 'static',
      attributes: {
        title: title,
        content: text
      },
      links: links || {}
    },
    meta: meta || {_ts_: new Date().getTime()}
  }
};

export const getSelfUrl = (value) => {
  if (value) {
    if (value.data && value.data.links && value.data.links.self !== undefined) {
      return value.data.links.self;
    }
    else if (value.errors && value.errors.length > 0 &&
      value.errors[0].links && value.errors[0].links.self !== undefined) {
      return value.errors[0].links.self;
    }
  }

  return undefined;
};

export const processHashUrl = (e) => {
  if(!e.ctrlKey) {
    processHashUrlForDocument(e, MAIN_DOCUMENT);
  }
};

export const openInModal = (e) => {
  if(!e.ctrlKey) {
    processHashUrlForDocument(e, MAIN_MODAL_DOCUMENT);
  }
};

export const addUrlHandlers = (element, documentName) => {
  element.on("click", '.process-hash-url', function (e) {
    if(!e.ctrlKey) {
      e.preventDefault();
      processHashUrlForDocument(e, documentName);
    }
  });

  element.on("click", '.open-hash-url', function (e) {
    if(!e.ctrlKey) {
      e.preventDefault();
      processHashUrl(e);
    }
  });

  element.on("click", '.open-in-modal', function (e) {
    if(!e.ctrlKey) {
      e.preventDefault();
      openInModal(e);
    }
  });
};

export const processHashUrlForDocument = (e, documentName) => {
  let url;
  if (e.currentTarget) {
    url = e.currentTarget.getAttribute("href");
    if (!(/^#/.test(url) || url === '' || url === '#' || url === '#!')) return;
    e.preventDefault();
  } else {
    url = e;
    if (!url.startsWith("#!")) url = "#!" + url;
  }

  clearDocumentState(url);

  be5.url.open({documentName: documentName || MAIN_DOCUMENT}, url);
};

export const loadDocumentByUrl = (url, frontendParams) => {
  const attr = be5.url.parse(url);
  const params = Object.assign(attr.named, {[TIMESTAMP_PARAM]: new Date().getTime()});
  be5.net.request(be5.url.form(attr.positional), params, json => {
    changeDocument(frontendParams.documentName, {value: json, frontendParams: frontendParams});
  }, (json) => {
    changeDocument(frontendParams.documentName, {value: json, frontendParams: frontendParams});
  })
};

/**
 * layout: '{"cancelActionText":"Back"}'
 * layout: '{"cancelAction": {"type": "SET_URL","value":"text/test123"}}'
 */
export const _createBackAction = (layout, frontendParams) => {
  if (layout === undefined) layout = {};
  if (layout.hasOwnProperty('cancelAction') || layout.cancelActionText
    || frontendParams.documentName === MAIN_DOCUMENT) {
    const action = layout.cancelAction || getDefaultCancelAction();
    return (
      <button type="button" className="btn btn-secondary back-action-btn"
              onClick={() => executeFrontendActions(action, frontendParams)}>
        {layout.cancelActionText || be5.messages.back}
      </button>
    );
  } else {
    return null;
  }
};

const getDefaultCancelAction = () => {
  if (window.history.length > 1) {
    return new FrontendAction(GO_BACK);
  } else {
    return new FrontendAction(OPEN_DEFAULT_ROUTE);
  }
};
