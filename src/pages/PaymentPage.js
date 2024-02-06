import React from 'react';
import { MainTitle } from './ProductListPage';
import CartList from '../components/CartList'
import styled from 'styled-components';

export default function PaymentPage() {

    return (
        <React.Fragment>
            <MainTitle>Payment</MainTitle>
            <CartListWrapper>
                <CartList useToPage={true} />
            </CartListWrapper>
        </React.Fragment>
    )
}

const CartListWrapper = styled.div`
    display: block;
    width: 100%;
    height: auto;
    padding: 32px;
    border: 1px solid var(--grayscale-200);
    border-radius: 4px;
    background-color: var(--brand-white);
`;