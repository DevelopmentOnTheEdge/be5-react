

export const getResourceByID = (included, id) => {
  for(let i =0; i < included.length; i++)
  {
    if(included[i].id === id)return included[i];
  }
  return undefined;
};

export const getModelByID = (included, meta, id) => {
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

export const createStaticValue = (title, text, meta, links) => {
  return {
    data: {
      type: 'static',
      attributes: {
        title: title,
        content: text
      }
    },
    meta: meta || {_ts_: new Date().getTime()},
    links: links || {}
  }
};