export const collectIdsAndDocs = (doc) => {
  return { ...doc.data(), id: doc.id };
};
