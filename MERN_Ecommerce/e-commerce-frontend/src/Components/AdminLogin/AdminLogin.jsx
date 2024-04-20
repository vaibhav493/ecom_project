import React, { useState } from 'react';
import './AdminLogin.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const AdminLogin =  () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
//   const notify = ()=>{
//     toast.error('wrong password or username !')
//   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/admin_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      console.log(data); 

      if(data.isLoggedIn){
        
         window.location.href="http://localhost:3001/"
      } else{
        alert("Wrong password or username !")
      }
      
       
    } catch (error) {
      console.error('Error:', error);  
    }


  };

  return (
    <div className="login-container">
      <div className="banner">
        
        <img src={"https://static.vecteezy.com/system/resources/previews/005/879/539/non_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"} alt="Thrift Shop Banner" className="banner-image" />
        {/* Login form */}
        <div className="login-form">
          <h2 className="login-title">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-btn" onClick={handleSubmit}>Login</button>
        </div>
      </div>
      <ToastContainer position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={"Zoom"} />
    </div>
  );
};

export default AdminLogin;
