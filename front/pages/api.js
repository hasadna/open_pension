export const getInvestmentTypes = () => {
  return {
    pension: 'פנסיה',
    gemel: 'גמל',
    bituah: 'ביטוח'
  }
};

export const getInvestmentPath = () => {
  return [
    'שריעה', 'סיכון מועט', 'סיכון מוגבר', 'סיכון בינוני', 'מקבלי קצבה', 'מניות', 'ממשלתי',
  ];
};

export const getLastUpdate = () => {
  return '18/09/2020 לפי רבעון 4 של שנת 2020';
}

export const getBodies = () => {
  return [
    'אלטשולר שחם',
    'כלל ביטוח',
    'כלל ביטוח',
    'מנורה מבטחים',
    'הפניקס',
    'הכשרה',
    'פסגות',
  ];
}
