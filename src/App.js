import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductListPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/detail" element={<ProductDetailPage />}></Route>
            <Route path="/payment" element={<PaymentPage />}></Route>
        </Routes>
    );
}