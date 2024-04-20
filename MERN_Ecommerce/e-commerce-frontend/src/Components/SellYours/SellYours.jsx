import React from 'react'
import "./sell.css";
import { useNavigate } from 'react-router-dom';
export default function SellYours() {

const redirect = useNavigate()
    const openAdminPanel = ()=>{
     
   
    window.location.href="http://localhost:3001/"
    }
  return (
    <div>
      <button onClick={()=>{openAdminPanel()}}  className='sell_btn'>
      Sell Yours....
      </button>
    </div>
  )
}
