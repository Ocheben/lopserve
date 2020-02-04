export const formatDate = date => {
  const dateObject = new Date(date);
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  // eslint-disable-next-line prettier/prettier
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[month]} ${year}`;
};

export const formatFullDate = date => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  // eslint-disable-next-line prettier/prettier
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day}, ${months[month]} ${year}`;
};

export const isoFormatDate = date => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  // eslint-disable-next-line prettier/prettier
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
};
