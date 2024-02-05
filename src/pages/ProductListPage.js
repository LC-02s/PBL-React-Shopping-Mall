import React from 'react';
import styled from 'styled-components';

import ProductCategory from '../components/ProductCategory'
import ProductList from '../components/ProductList'

export default function ProductListPage() {
    return (
        <React.Fragment>
            <MainTitle>Product</MainTitle>
            <ProductCategory />
            <ProductList />
        </React.Fragment>
    )
}

export const MainTitle = styled.h2`
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 12px;
    font-size: 24px;
    font-weight: 700;
    color: var(--grayscale-900);
`;
