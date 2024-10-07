import React from 'react';
import { useAppContext } from './AppContext';
import { formatNumber } from './utils';

const OrderPreview = ({ totalAmount, productList }) => {
  const { totalFrozenAmount, totalCookedAmountWeeks, numWeeks } = useAppContext()
  return (
    <div className="order-preview-container">

      
        {totalFrozenAmount + totalCookedAmountWeeks === 0 ? (
        <p>No order placed yet.</p>
      ) : (
        <>
            <h4>Please check your order:</h4>
            <div className="order-preview">
              {totalFrozenAmount !== 0 && (
                <>
                  <p>Frozen: {formatNumber(totalFrozenAmount)}</p>
                  <ul>
                    {productList.map(product =>
                      product.frozenQuantity !== 0 ? (
                        <li>{product.name}: {product.frozenQuantity} pieces</li>
                      ) : null
                    )}
                  </ul>
                </>

              )}

              {totalCookedAmountWeeks !== 0 && (
                <>
                  <p>Lunch: {numWeeks} week(s) {formatNumber(totalCookedAmountWeeks)}</p>
                  {numWeeks > 1 && <div className='everyweek-line'>Every week:</div>}
                  <ul>
                    {['monBoiledQuantity', 'wedBoiledQuantity', 'friBoiledQuantity'].map((dayKey, index) => {
                      const dayName = dayKey === 'monBoiledQuantity' ? 'Monday' : dayKey === 'wedBoiledQuantity' ? 'Wednesday' : 'Friday';
                      
                      const productsForDay = productList.filter(product => product[dayKey] > 0);

                      return productsForDay.length > 0 ? (
                        <li key={index}>
                          {dayName}:
                          <ul>
                            {productsForDay.map(product => (
                              <li key={product.name}>{product.name} - {product[dayKey]}</li>
                            ))}
                          </ul>
                        </li>
                      ) : null;
                    })}
                  </ul>



                </>
              )}
              <h3>Total bill: {formatNumber(totalAmount)}</h3>
            </div>
        </>
        )}
    </div>
  );
}

export default OrderPreview;