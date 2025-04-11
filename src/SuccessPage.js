import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => navigate("/"), [navigate]); // tránh gọi lại useNavigate() khi re-render

  return (  
    <>
      <div className="success-container">

        <div className="success-announcement">
          <h2>Thank you for your order !!</h2>
          <p><i>Please note the following details:</i></p>
          <p>
            <strong>* Frozen orders</strong> will be delivered to ES/MS/HS freezer as your choice. <br />
            {/* (excluding School Holidays) */}
          </p>
          <p>
            <strong>* Lunches</strong> will be delivered to the Security Table at Gate 2 at your chosen time.
          </p>
          <button className="back-to-order-button"
              onClick={handleBack}>
            Back to Homepage
          </button>
        </div>
      </div>  
    </>
  );
}
 
export default SuccessPage;