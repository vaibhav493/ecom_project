import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import toast, { Toaster } from 'react-hot-toast';


const ProductDisplay = (props) => {

  const {product} = props;
  console.log("single cart product item->",product)
  const {addToCart} = useContext(ShopContext);
  const notify = ()=>{

    toast.success('Successfully Added to Cart !')
  }


  const add_To_Cart = async (productId) => {

    console.log("-------->>>",productId)

    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.success) {
        notify()
        // Optionally, update the UI or perform any other action
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart. Please try again later.");
    }
  };


  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">₹{product.old_price}</div>
          <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
         { 
          product.description
         }
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div style={{border:product.size=="S"?"3px solid blue":""}}>S</div>
            <div style={{border:product.size=="M"?"3px solid blue":""}}>M</div>
            <div  style={{border:product.size=="L"?"3px solid blue":""}}>L</div>
            <div  style={{border:product.size=="XL"?"3px solid blue":""}}>XL</div>
            <div  style={{border:product.size=="XXL"?"3px solid blue":""}}>XXL</div>
          </div>
        </div>
        <button onClick={()=>{
          add_To_Cart(product._id);
        
        }}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> Women, T-shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
      </div>
      <Toaster
      position="top-center"
      reverseOrder={false}
    />
    </div>
  );
};

export default ProductDisplay;
