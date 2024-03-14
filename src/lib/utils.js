export const simpleForm = value =>
  value > 999999 ? value / 1000000 : value > 999 ? value / 1000 : value;

export const assignValue = value =>
  value > 999999 ? "M" : value > 999 ? "K" : "";
