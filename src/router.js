import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./page/page";
import Login from "./page/login";
import SignUp from "./page/signup";


function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Page/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default router