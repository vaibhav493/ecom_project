import React from "react";
import "./Hero.css";
import hero_image from "../Assets/hero_image.png";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    // <div style={{border:"1px solid red"}} className="hero">
    //   <div className="hero-left">
    //     <h2>NEW ARRIVALS ONLY</h2>
    //     <div>
    //       <div className="hero-hand-icon">
    //         <p>new</p>
    //         <img src={hand_icon} alt="" />
    //       </div>
    //       <p>collections</p>
    //       <p>for everyone</p>
    //     </div>
    //     <div className="hero-latest-btn">
    //       <div>Latest Collection</div>
    //       <img src={arrow_icon} alt="" />
    //     </div>
    //   </div>
    //   <div className="hero-right">
    //     <img src={hero_image} alt="hero" />
    //   </div>
    // </div>
    
    <div className="main_cont">

    <div className="container" >
  <div className="home-header home">
    <div className="content">
      <div className="text-section">
        <p className="title">The Hidden Cost of Trends: How Fast Fashion Fractures Our Environment</p>
        <p className="description">
          From concept to launch, Alt WAV provides actionable insights
          enabling you to create any Shopping experience with confidence.
        </p>
        <Link className="shop-btn" to="/login">
          <span><i className="fas fa-shopping-cart"></i>Shop</span>
        </Link>
      </div>
      <div className="image-section">
        <img src="images/familyShopping.png" alt="familyShopping" />
      </div>
    </div>
  </div>
</div>
</div>

  );
};

export default Hero;
