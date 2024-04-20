import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ListProduct = () => {


  const [allproducts, setAllProducts] = useState([]);


const userID = JSON.parse(localStorage.getItem("user-admin-credential"))
  const fetchInfo = () => {
    const userId = localStorage.getItem("user-admin-credential");
    fetch('http://localhost:4000/admin_product_list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID: userID })
    })
    .then((res) => res.json())
    .then((data) => setAllProducts(data))
}

useEffect(() => {
    fetchInfo();
}, []);


// Function to remove a product from the list
const removeProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:4000/remove_admin_product`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "user-id":JSON.parse(localStorage.getItem("user-admin-credential"))
      },
      body: JSON.stringify({ productId }) // Send the product ID to be removed
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Product removed successfully:", data.message);
      // Handle UI update or notification for successful removal
    } else {
      console.error("Error removing product:", data.error);
      // Handle error scenario, such as displaying an error message to the user
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle network error or other unexpected errors
  }
};

const removeUIProduct = (id) => {
    
  const products = allproducts.filter((ele)=>{
    return ele._id !== id?ele:null;
    
  })

  setAllProducts(products)
}

console.log(JSON.parse(localStorage.getItem("user-admin-credential")))

console.log("all product",allproducts)
  
  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => {
          return (
            <div>
              <div className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={e.image} alt="" />
                <p cartitems-product-title>{e.name}</p>
                <p>${e.old_price}</p>
                <p>${e.new_price}</p>
                <p>{e.category}</p>
                <img className="listproduct-remove-icon" onClick={()=>{removeProduct(e._id);removeUIProduct(e._id)}} src={cross_icon} alt="" />
              </div>
              
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListProduct;
