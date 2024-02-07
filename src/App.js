import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PaymentPage from "./pages/PaymentPage";
import { Provider } from "react-redux";
import store from "./context/store";
import Header from './components/Header'
import { Contents } from './components/Common.style'
import Footer from './components/Footer'
import CommonModal from './components/CommonModal'
import NotFound from "./components/NotFound";

export default function App() {
    return (
        <Provider store={store}>
            <Header />
            <Contents>
                <Routes>
                    <Route path="/" element={<ProductListPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>
                    <Route path="/detail/:id" element={<ProductDetailPage />}></Route>
                    <Route path="/payment" element={<PaymentPage />}></Route>
                    <Route path="/*" element={<NotFound />}></Route>
                </Routes>
                <CommonModal />
            </Contents>
            <Footer />
        </Provider>
    );
}