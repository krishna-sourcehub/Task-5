import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SmoothScroll from "smooth-scroll";
import JsonData from "../data/data.json";
import Aadhar_Transfer from "./Aadhar_transfer";
import Account_Transfer from "./Account_Transfer";
import "./App.css";
import Credit_Card_Transfer from "./Credit_Card_Transfer.jsx";
import Crypto_Transfer from "./Crypto_Transfer.jsx";
import Email_Transfer from "./Email_Transfer";
import Gold_Transfer from "./Gold_Transfer.jsx";
import Home from "./Home";
import International_Transfer from "./International_Transfer.jsx";
import Login from "./Login.jsx";
import Mobile_Number_Transfer from "./Mobile_Number_Transfer";
import Profile from "./Profile.jsx";
import Razorpay from "./Razorpay.jsx";
import Send_Money from "./Send_Money.jsx";
import Signup from "./Signup.jsx";
import Sucess from "./Sucess.jsx";
import Tabletrans from "./Tabletrans.jsx";
import Terms from "./Terms.jsx";
import Tracking from "./Tracking.jsx";
import UPI_Transfer from "./UPI_Transfer";
import Navigation from "./navigation.jsx";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 100,
  speedAsDuration: true,
});

const App = () => {
 
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
 


  return (
    <div>
      <Navigation />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/History" element={<Tabletrans />} />
        <Route path="/SendMoney" element={<Send_Money/>} />
        <Route path="/Track" element={<Tracking/>} />
        <Route path="/AccountTransfer" element={<Account_Transfer/>} />
        <Route path="/AadharTransfer" element={<Aadhar_Transfer/>} />
        <Route path="/MobileTransfer" element={<Mobile_Number_Transfer/>} />
        <Route path="/UPITransfer" element={<UPI_Transfer/>} />
        <Route path="/EmailTransfer" element={<Email_Transfer/>} />
        <Route path="/CreditTransfer" element={<Credit_Card_Transfer/>} />
        <Route path="/CryptoTransfer" element={<Crypto_Transfer/>} />
        <Route path="/InternationalTransfer" element={<International_Transfer/>} />
        <Route path="/GoldTransfer" element={<Gold_Transfer/>} />
        <Route path="/Razorpay" element={<Razorpay/>} />
        <Route path="/Sucess" element={<Sucess/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Terms" element={<Terms/>} />
      </Routes>
    </div>
  );
};

export default App;
