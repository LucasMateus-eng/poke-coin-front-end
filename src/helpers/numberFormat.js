const numberFormat = (value) => {
  return value === 0 ? value : value.toFixed(2);
};

export default numberFormat;