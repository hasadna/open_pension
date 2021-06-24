export const getInvestmentTypes = () => {
  return {
    pension: 'פנסיה',
    gemel: 'גמל',
    bituah: 'ביטוח'
  }
};

export const getInvestmentPath = () => {
  return {
    saria: 'שריעה',
    lowRisk: 'סיכון מועט',
    highRisk: 'סיכון מוגבר',
    mediumRisk: 'סיכון בינוני',
    onABudget: 'מקבלי קצבה',
    stocks: 'מניות',
    gov: 'ממשלתי'
  };
};

export const getLastUpdate = () => {
  return '18/09/2020 לפי רבעון 4 של שנת 2020';
}

export const getBodies = () => {
  return {
    alt: 'אלטשולר שחם',
    klal: 'כלל ביטוח',
    menora: 'מנורה מבטחים',
    hach: 'הכשרה',
    pasgot: 'פסגות',
  };
}

export const convertServerEntitiesToKeyValue = (entities) => Object.fromEntries(Object.entries(entities).map(([, {ID, label}]) => {
  return [ID, label];
}))
