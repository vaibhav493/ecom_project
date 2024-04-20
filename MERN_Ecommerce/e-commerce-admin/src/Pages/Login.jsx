import React, { useState } from 'react';
import './Login.css';
// import bannerImage from './banner.jpg'; // Import your banner image

const Login =  ({setlogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
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
      localStorage.setItem("user-admin-credential",JSON.stringify(data.userKey))
      console.log(data); 

      if(data.isLoggedIn){
            setlogin(true)
      }else{
        alert("wrong password or username !")
        setlogin(false)
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
    </div>
  );
};

export default Login;
