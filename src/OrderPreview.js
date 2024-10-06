import { useAppContext } from './AppContext';
import { formatNumber } from './utils';

const OrderPreview = ({ totalAmount, productList }) => {
  const { totalFrozenAmount, totalCookedAmountWeeks } = useAppContext()
  return (
    <div className="order-preview-container">
      {totalFrozenAmount + totalCookedAmountWeeks === 0 ? (
        <p>No order placed yet.</p>
      ) : (
        <>
          <h4>Please check your order:</h4>
          {totalFrozenAmount !== 0 && (
            <>
              <p>Frozen: {formatNumber(totalFrozenAmount)}</p>
              <ul>
                {productList.map(product =>
                  product.frozenQuantity !== 0 ? (
                    <li>{product.name}: {product.frozenQuantity}p</li>
                  ) : null
                )}
              </ul>
            </>

          )}

          {totalCookedAmountWeeks !== 0 && (
            <>
              <p>Lunch: 1 week(s) {formatNumber(totalCookedAmountWeeks)}</p>
              <ul>
                {productList.map(product => {
                  // Kiểm tra xem sản phẩm có số lượng nào khác 0 hay không
                  const hasQuantity =
                    product.monBoiledQuantity > 0 ||
                    product.wedBoiledQuantity > 0 ||
                    product.friBoiledQuantity > 0;

                  return hasQuantity ? (
                    <li key={product.name}>
                      {product.name}:
                      <ul>
                        {product.monBoiledQuantity > 0 && (
                          <li>Monday: {product.monBoiledQuantity} portion(s)</li>
                        )}
                        {product.wedBoiledQuantity > 0 && (
                          <li>Wednesday: {product.wedBoiledQuantity} portion(s)</li>
                        )}
                        {product.friBoiledQuantity > 0 && (
                          <li>Friday: {product.friBoiledQuantity} portion(s)</li>
                        )}
                      </ul>
                    </li>
                  ) : null; // Nếu không có số lượng, trả về null
                })}
              </ul>

            </>
          )}
          <h2>Your total bill: {formatNumber(totalAmount)}</h2>
        </>
      )}

    </div>
  );
}

export default OrderPreview;