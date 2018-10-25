import be5 from "../be5";
import Preconditions from '../utils/preconditions';

export const getResourceByID = (included, id) => {
  if(included === undefined) return undefined;

  for(let i =0; i < included.length; i++)
  {
    if(included[i].id === id)return included[i];
  }
  return undefined;
};

export const getResourceByType = (included, type) => {
  if(included === undefined) return undefined;

  for(let i =0; i < included.length; i++)
  {
    if(included[i].type === type)return included[i];
  }
  return undefined;
};

export const getModelByID = (included, meta, id) => {
  if(included === undefined) return undefined;

  const res = getResourceByID(included, id);
  if(res !== undefined)
  {
    return {data: res, included: included, meta: meta};
  }
  else
  {
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
  if(value)
  {
    if (value.data && value.data.links && value.data.links.self !== undefined)
    {
      return "#!" + value.data.links.self;
    }
    else if (value.errors && value.errors.length > 0 &&
      value.errors[0].links && value.errors[0].links.self !== undefined)
    {
      return "#!" + value.errors[0].links.self;
    }
  }

  return undefined;
};

export const processHashUrl = (e, documentName) => {
  let url = e.target.getAttribute("href");
  if (/^#/.test(url)) {
    e.preventDefault();
    if (url.startsWith("#!table/")) {
      url = url + "/_cleanNav_=true";
    }
    console.log(url, documentName);
    be5.url.process(documentName || be5.MAIN_DOCUMENT, url);
  }
};

export const openInModal = (e) => {
  if(/^#/.test(e.target.getAttribute("href"))) {
    e.preventDefault();
    be5.url.process(be5.MAIN_MODAL_DOCUMENT, e.target.getAttribute("href"));
  }
};
