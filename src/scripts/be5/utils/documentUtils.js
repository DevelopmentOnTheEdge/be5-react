

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
