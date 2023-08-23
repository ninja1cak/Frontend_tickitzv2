import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./page/page";
import Login from "./page/login";


function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Page/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default router