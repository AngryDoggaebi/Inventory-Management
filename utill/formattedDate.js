const today = new Date();
export const formattedToday = `${today.getFullYear()}-${
  today.getMonth() + 1
}-${today.getDate()}`;

const yesterday = new Date(today.setDate(today.getDate() - 1));
export const formattedYesterday = `${yesterday.getFullYear()}-${
  yesterday.getMonth() + 1
}-${yesterday.getDate()}`;
