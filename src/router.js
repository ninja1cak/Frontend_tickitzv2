import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./page/page";


function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Page/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default router