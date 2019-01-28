const documents = {};

export const getDocument = (type) => {
  return documents[type];
};

// createDocument(type, props) {
//   return documents[type](props);
// };

export const registerDocument = (type, component) => {
  documents[type] = component;
};

export const getAllDocumentTypes = () => {
  return Object.keys(documents);
};
