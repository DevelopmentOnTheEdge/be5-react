const tableBoxes = {};

export const getTableBox = (type) => {
  return tableBoxes[type];
};

export const registerTableBox = (type, component) => {
  tableBoxes[type] = component;
};

export const getAllTypes = () => {
  return Object.keys(tableBoxes);
};
