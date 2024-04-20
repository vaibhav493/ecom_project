import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const CartItems = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,
    getTotalCartAmount
  
  } = useContext(ShopContext);
const redirect = useNavigate()
//   console.log("inside cart ->", products)

const [cartProducts,setCartProducts] = useState([])

  async function fetchCartData() {
    console.log("got inside func")
    try {
      const token = localStorage.getItem('auth-token'); // Get the authentication token from localStorage
      if (!token) {
        console.log("User not logged in.");
        alert("User not logged in.")
        return;
      }
  
      const response = await fetch('http://localhost:4000/getcart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token // Pass the authentication token in the header
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
  
      const cartData = await response.json();
      console.log("Cart Data:::", cartData);
      setCartProducts(cartData.products)
      
      // Process cart data here, such as displaying it on the UI
    } catch (error) {
      alert("getting error while getting cart data !")
      console.error('Error fetching cart data , check cartitems component::', error.message);
    }
  }


  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('auth-token'); // Assuming the token is stored in localStorage after user login
      const response = await fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({ productId })
      });
  
      const data = await response.json();
      
      console.log(data.message);
      toast.success(data.message)
      // Output success message or handle errors
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };
  
  
  useEffect(()=>{
fetchCartData()
},[])


  const totalAmtCart = ()=>{
    let total=0;
    cartProducts.forEach((ele)=>{
      total += ele.new_price*ele.quantity
    })
    
    return total;
  }
  
  const removeProduct = (id) => {
    
    const products = cartProducts.filter((ele)=>{
      return ele._id !== id?ele:null;
      
    })
    
    
    
    setCartProducts(products)
  }
  
  
  
  
  console.log("cartProducts",cartProducts)
  localStorage.setItem("user_cart_data",JSON.stringify(cartProducts))
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
     
      {cartProducts.map((e)=>{

        if(cartProducts.length)
        {
          return  <div>
                    <div className="cartitems-format-main cartitems-format">
                      <img className="cartitems-product-icon" src={e.image} alt="" />
                      <p cartitems-product-title>{e.name}</p>
                      <p>₹{e.new_price}</p>
                      <button className="cartitems-quantity">{e.quantity}</button>
                      <p>₹{e.quantity*e.new_price}</p>
                      <img onClick={()=>{removeFromCart(e._id);
                        removeProduct(e._id);
                      }} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{totalAmtCart()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{totalAmtCart()}</h3>
            </div>
          </div>
          <button onClick={()=>{
redirect("/Checkout")
          }}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    
    style: {
     
      padding: '16px',
      // color: '#713200',
      height:"60px",
      width:"375px",
    },
  }}
/>
    </div>
  );
};

export default CartItems;
