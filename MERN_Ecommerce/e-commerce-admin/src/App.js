import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import {Route,Routes} from "react-router-dom"
import Login from "./Pages/Login";
import { useState } from "react";
function App() {
  
   const [login,setlogin]= useState(0)

  
  return (
      <div>
        <Navbar />
       {
        login?<Admin/>:<Login setlogin={setlogin}/>
       }
       
      
        <Footer />
      </div>
  );
}

export default App;
