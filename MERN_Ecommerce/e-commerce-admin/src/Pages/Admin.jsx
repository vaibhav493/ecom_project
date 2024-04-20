import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";
import Login from "./Login";

const Admin = () => {

  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/admin/addproduct" element = {<AddProduct />} />
        <Route path="/admin/listproduct" element = {<ListProduct />} />
        <Route path="/Login" element = {<Login />} />

      </Routes>
    </div>
  );
};

export default Admin;
