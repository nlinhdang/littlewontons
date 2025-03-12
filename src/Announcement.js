
import React, { useState, useEffect } from 'react';

const Announcement = ({ year, month, day, message, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const endDate = new Date(year, month - 1, day, 23, 59, 59);
      const shouldShow = now <= endDate;

      console.log("Current Date:", now);
      console.log("Announcement Expiry Date:", endDate);
      console.log("Should Show Announcement?", shouldShow);

      setIsVisible(shouldShow);
    };

    checkDate(); // Kiểm tra ngay khi component render
    const intervalId = setInterval(checkDate, 24 * 60 * 60 * 1000); // Kiểm tra lại mỗi ngày
    
    return () => clearInterval(intervalId); // Dọn dẹp interval khi component bị unmount
  }, [year, month, day]);

  const isHTML = (str) => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return Array.from(div.childNodes).some(node => node.nodeType === 1); // Kiểm tra xem có phần tử HTML hay không
  };

  
  return (
    isVisible && (
      <div className={`${className}`}>
        {isHTML(message) ? (
          <span dangerouslySetInnerHTML={{ __html: message }} />
        ) : (
          message
        )}
      </div>
    )
  );
};

export default Announcement;
