import React, { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';
import { LunchContext } from './Context/LunchContext';
import { FrozenContext } from './Context/FrozenContext';
import { UserContext } from "./Context/Note-userContext";

import { formatNumber } from './utils';

const OrderPreviewComponent = ({ productList }) => {
  const totalFrozenAmount = useContextSelector(FrozenContext, ({ totalFrozenAmount }) => totalFrozenAmount);
  const totalCookedAmountWeeks = useContextSelector(LunchContext, ({ totalCookedAmountWeeks }) => totalCookedAmountWeeks);
  const numWeeks = useContextSelector(LunchContext, ({ numWeeks }) => numWeeks);
  const setTotal = useContextSelector(UserContext, ({ setTotal }) => setTotal);

  
  const memoizedProductList = React.useMemo(() => productList, [productList]);

  const totalAmount = totalFrozenAmount + totalCookedAmountWeeks;
  useEffect(() => {
    setTotal(totalAmount)
  }, [totalAmount])

  const dayKeyMap = {
    Monday: "monBoiledQuantity",
    Wednesday: "wedBoiledQuantity",
    Friday: "friBoiledQuantity",
  };
  
  const productsForDays = React.useMemo(() => ({
    Monday: memoizedProductList.filter(product => product.monBoiledQuantity > 0),
    Wednesday: memoizedProductList.filter(product => product.wedBoiledQuantity > 0),
    Friday: memoizedProductList.filter(product => product.friBoiledQuantity > 0),
  }), [memoizedProductList]);

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
                  {memoizedProductList.map(product =>
                    product.frozenQuantity !== 0 ? (
                      <li key={product.name}>{product.name}: {product.frozenQuantity} pieces</li>
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
                  {Object.entries(productsForDays).map(([dayName, products]) =>
                    products.length > 0 ? (
                      <li key={dayName}>
                        {dayName}:
                        <ul>
                          {products.map(product => (
                            <li key={product.name}>{product.name}: {product[dayKeyMap[dayName]]}</li>
                          ))}
                        </ul>
                      </li>
                    ) : null
                  )}
                    
                </ul>



              </>
            )}
            <h3>Total: {formatNumber(totalAmount)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

const OrderPreview = React.memo(OrderPreviewComponent);

export default OrderPreview;