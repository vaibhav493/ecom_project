import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";
 import AdminLogin from "./Components/AdminLogin/AdminLogin";
import Checkout from "./Components/Checkout/Checkout";
import Success from "./Components/Redirections/Success";
import Cancel from "./Components/Redirections/Cancel";
function App() {

  return (
    <div>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="/AdminLogin" element={<AdminLogin/>} />
          <Route path="/Checkout"  element={<Checkout/>}/>
          <Route path="/Success"  element={<Success/>}/>
          <Route path="/Cancel"  element={<Cancel/>}/>


        </Routes>
        <Footer />
       
    </div>
  );
}

export default App;
