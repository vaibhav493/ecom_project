import React, { useState } from 'react';
import './Checkout.css';
import {loadStripe} from '@stripe/stripe-js';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //stripe payment integration ....
  const makePayment = async()=>{
      const stripe = await loadStripe("pk_test_51P7LQRSJBn2yWm9qN2L5BjocY9Aai6iQchPbUTe6qdMF4fdgBR0VsLSP9VWDlLgwyqj44aJsJg6iBj0BF0aiGrcs00Khptdsp4");

    const body = {
        products:JSON.parse(localStorage.getItem("user_cart_data"))
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:4000/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
        }
    }
const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission here (e.g., send data to backend)

  localStorage.setItem("user_order_details",JSON.stringify(formData))
  console.log(formData);
  makePayment()
};

return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="personal-info">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP Code:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
       
        <div className='btn_container'>
        <button className='placeOrderbtn' type="submit">Place Order</button>
        <br/>
        <button className='bck_btn' onClick={()=>{}}>🔙 Back </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
