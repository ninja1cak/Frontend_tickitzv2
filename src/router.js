import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Buy_ticket from "./page/details_movie/index";
import Login from "./page/login/index";
import SignUp from "./page/signup/index";
import Order_page from "./page/Order_page/index"
import Payment_page from "./page/payment_page/index"
import Check_payment from "./page/check_payment";
import Home from "./page/page/index";
import Profile from "./page/profile/index";


function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/buy_ticket/:id" element={<Buy_ticket/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/register/:token" element={<SignUp/>}/>
            <Route path="/order_page" element={<Order_page/>}/>
            <Route path="/payment_info" element={<Payment_page/>}/>
            <Route path="/check_payment" element={<Check_payment/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default router