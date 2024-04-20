import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {

  // const userId = localStorage.getItem("user-admin-credential")
  const userId = JSON.parse(localStorage.getItem("user-admin-credential"));
  // const[image,setImage] = useState(false);
  console.log("user id ->", userId);
  const [productDetails,setProductDetails] = useState({
      name:"",
      image:"",
      category:"women",
      new_price:0,
      old_price:0,
      userID:userId,
      description:"",
      size:""
  });

  const AddProduct = async (e) => {
    e.preventDefault()
    // let dataObj;
    // let product = productDetails;

    // let formData = new FormData();
    // formData.append('second_db', image);
    
    // await fetch('http://localhost:4000/upload', {
    //   method: 'POST',
    //   headers: {
    //     Accept:'application/json',
    //   },
    //   body: formData,
    // })
    //   .then((resp) => resp.json())    
    //   .then((data) => {dataObj=data});

    // if (dataObj.success) {
    //   product.image = dataObj.image_url;
    //   console.log(product);
    //   await fetch('http://localhost:4000/addproduct', {
    //   method: 'POST',
    //   headers: {
    //     Accept:'application/json',
    //     'Content-Type':'application/json',
    //   },
    //   body: JSON.stringify(product),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {data.success?alert("Product Added"):alert("Failed")});
      
    // }

     try{

      await fetch('http://localhost:4000/addproduct', {
           method: 'POST',
           headers: {
             Accept:'application/json',
             'Content-Type':'application/json',
           },
           body: JSON.stringify(productDetails),
         })
           .then((resp) => resp.json())
           .then((data) => {data.success?console.log("added !"):alert("Failed ! something went wrong")});

     }catch(err){
        console.log(err);
         alert("Failed ! found error ")
     }
              
       
      
   




  }

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

  // const imageHandler = (e) => {
  //   setImage(e.target.files[0]);
  //   }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title......</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
      </div>


      <div className="addproduct-itemfield">
      <p>Product Description.....</p>
      <input type="text" name="description" value={productDetails.description} onChange={(e)=>{changeHandler(e)}} placeholder="add product description here...." />
    </div>



      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price....</p>
          <input type="number" name="old_price" value={productDetails.old_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price.......</p>
          <input type="number" name="new_price" value={productDetails.new_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select> 
      </div>

      <div className="addproduct-itemfield">
      <p>Product Size</p>
      <select value={productDetails.size} name="size" className="add-product-selector" id="product_size_selector"  onChange={changeHandler}>
        <option value="XL">XL</option>
        <option value="S">S</option>
        <option value="XXL">XXL</option>
        <option value="M">M</option>
        <option value="L">L</option>


      </select> 
    </div>

     <input value={productDetails.image} onChange={changeHandler} name="image" type="text" className="img_link" placeholder="paste product image link here........"/>
      <button className="addproduct-btn" onClick={(e)=>{
        
        AddProduct(e);
      toast("Product Added succesfully")
      }}>ADD</button>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
