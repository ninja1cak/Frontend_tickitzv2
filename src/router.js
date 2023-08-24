import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./page/details_movie/index";
import Login from "./page/login/index";
import SignUp from "./page/signup/index";


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