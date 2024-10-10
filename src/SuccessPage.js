import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate()

  return (  
    <>
      <div className="success-container">

      <div className="success-announcement">
        <h2>Thank you for your order !!</h2>
        <p>We will contact you on WhatsApp when your Wontons have arrived.</p>
        <button className="back-to-order-button"
            onClick={() => { navigate("/") }}>
          Back to order
        </button>
          </div>
      </div>  
    </>
  );
}
 
export default SuccessPage;