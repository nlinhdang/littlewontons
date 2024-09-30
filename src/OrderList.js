// import React, { useEffect, useState } from 'react';

// const OrderList = () => {
//     const [orders, setOrders] = useState([]);

//     const fetchOrders = async () => {
//         try {
//             const response = await fetch('https://littlewontons-hcqzmdxsk-linhs-projects-fe6ae416.vercel.app/orders');
//             const data = await response.json();
//             setOrders(data); // Lưu dữ liệu vào state
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//         }
//     };

//     useEffect(() => {
//         fetchOrders(); // Gọi hàm khi component mount
//     }, []);

//     return (
//         <div>
//             <h2>Order List</h2>
//             <ul>
//                 {orders.map((order, index) => (
//                     <li key={index}>
//                         {/* Hiển thị thông tin đơn hàng tại đây, ví dụ: */}
//                         {JSON.stringify(order)}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderList;
