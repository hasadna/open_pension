export const getLastUpdate = () => {
  return '18/09/2020 לפי רבעון 4 של שנת 2020';
}

export const convertServerEntitiesToKeyValue = (entities) => Object.fromEntries(Object.entries(entities).map(([, {ID, label}]) => {
  return [ID, label];
}))
