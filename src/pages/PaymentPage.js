import React from 'react';
import { MainTitle } from './ProductListPage';
import CartList from '../components/cart/CartList'
import CartSummary from '../components/cart/CartSummary'
import styled from 'styled-components';

export default function PaymentPage() {

    return (
        <React.Fragment>
            <MainTitle>Payment</MainTitle>
            <CartListWrapper>
                <CartList useToPage={true} />
                <CartSummary useToPage={true} />
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