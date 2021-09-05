export const getLastUpdate = () => {
  return '18/09/2020 לפי רבעון 4 של שנת 2020';
}

export const convertLastUpdate = (lastUpdated) => {
  const date = new Date(lastUpdated * 1000);
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
}

export const convertServerEntitiesToKeyValue = (entities) => Object.fromEntries(Object.entries(entities).map(([, {ID, label}]) => {
  return [ID, label];
}))
