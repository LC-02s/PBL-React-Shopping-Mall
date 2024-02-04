import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import { Contents } from '../styles/styledModules';
import ProductCategory from '../components/ProductCategory';
import ProductList from '../components/ProductList';
import CommonModal from '../components/CommonModal';
import Footer from '../components/Footer';

export default function ProductListPage() {
    return (
        <React.Fragment>
            <Header />
            <Contents>
                <Title>Product</Title>
                <ProductCategory />
                <ProductList />
                <CommonModal />
            </Contents>
            <Footer />
        </React.Fragment>
    )
}

const Title = styled.h2`
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 12px;
    font-size: 20px;
    font-weight: 700;
    color: var(--grayscale-900);
`;
