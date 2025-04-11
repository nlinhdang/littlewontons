// utils.js
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000) + 'M';
  } else if (num >= 1000) {
    return (num / 1000) + 'k';
  }
  return num;
};

export const calculateAmount = (price, quantity, multiplier) => {
  const formattedPrice = parseFloat(price.replace('k', '')) * multiplier;
  return formattedPrice * (quantity || 0);
};

export const calculateTotalFrozenAmount = (productList) => 
  productList.reduce((sum, { frozenPrice, frozenQuantity }) => 
    sum + (parseFloat(frozenPrice) || 0) * (frozenQuantity || 0) * 100, 0
  );

export const handleSelectSectionChange = (event, setAction) => {
    const value = event.target.value;
    setAction(prevValue => (prevValue === value ? null : value));
  }
// export const formatSubmissionTime = (submissionTime) => {
//   const date = new Date(submissionTime);
  
//   // Lấy năm, tháng, ngày, giờ, phút, giây
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng 0-11, cần cộng thêm 1
//   const day = String(date.getDate()).padStart(2, '0');
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   const seconds = String(date.getSeconds()).padStart(2, '0');

//   // Trả về chuỗi theo định dạng yêu cầu
//   return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
// };

export const formatSubmissionTime = (submissionTime) => {
  const date = new Date(submissionTime);
  return date.toLocaleString('en-GB', { hour12: false }).replace(',', '');
};
