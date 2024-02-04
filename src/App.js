import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PaymentPage from "./pages/PaymentPage";
import { Provider } from "react-redux";
import store from "./context/store";

export default function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<ProductListPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/detail" element={<ProductDetailPage />}></Route>
                <Route path="/payment" element={<PaymentPage />}></Route>
            </Routes>
        </Provider>
    );
}