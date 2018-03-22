export const getBaseUrl = function()
{
  let getUrl = window.location;
  let baseUrl = getUrl.protocol + "//" + getUrl.host;
  if(getUrl.pathname.split('/')[1] !== "")  baseUrl += "/" + getUrl.pathname.split('/')[1];
  return baseUrl
};

export const arraysEqual = function(a, b)
{
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
