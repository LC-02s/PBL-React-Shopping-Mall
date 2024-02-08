import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PaymentPage from "./pages/PaymentPage";
import { Provider, useDispatch } from "react-redux";
import store from "./context/store";
import Header from './components/Header'
import { Contents } from './components/Common.style'
import Footer from './components/Footer'
import CommonModal from './components/CommonModal'
import NotFound from "./components/NotFound";
// import { changeUserState } from "./auth";
// import { clearUserData, setUserData } from "./context/actions/user";

export default function App() {
    /*
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = changeUserState((user) => {
            const { uid, displayName, email, photoURL, accessToken } = user;
            if (user) {
                dispatch(setUserData({ uid, displayName, email, photoURL, accessToken }));
            } else {
                dispatch(clearUserData());
            }
        });
        return () => unsubscribe();
    }, [dispatch]);
    */
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