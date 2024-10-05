import { useAppContext } from './AppContext';
import { formatNumber } from './utils';

const OrderPreview = ({ totalAmount }) => {
const {totalFrozenAmount, totalCookedAmountWeeks} = useAppContext()
  return (  
    <div className="order-preview-container">
      <h4>Please check your order:</h4>
      {totalFrozenAmount!==0 && <p>Frozen: 20p of Pork - {formatNumber(totalFrozenAmount)}</p>}
      {totalCookedAmountWeeks!==0 && <p>Lunch: 20p of Pork - {formatNumber(totalCookedAmountWeeks)}</p>}

      <h2>Your total bill: {formatNumber(totalAmount)}</h2>
    </div>
  );
}
 
export default OrderPreview;