export default {
  getResourceByID
};

function getResourceByID(included, id) {
  for(let i =0; i < included.length; i++)
  {
    if(included[i].id === id)return included[i];
  }
  return undefined;
}