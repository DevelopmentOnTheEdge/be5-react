

export default
{
  getBaseUrl()
  {
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + "//" + getUrl.host;
    if(getUrl.pathname.split('/')[1] !== "")  baseUrl += "/" + getUrl.pathname.split('/')[1];
    return baseUrl
  }
}