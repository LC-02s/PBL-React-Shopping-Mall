import React, { useEffect } from 'react'
import styled, { css } from 'styled-components';
import { CommonBtnMD } from '../styles/styledModules';
import { useDispatch } from 'react-redux';
import { setTotalPrice } from '../context/actions/cart';

export default function CartSummary({ totalPrice, useToModal }) {

    const dispatch = useDispatch();
    useEffect(() => { dispatch(setTotalPrice(totalPrice)); }, [ totalPrice, dispatch ]);

    return (
        <CartSummaryContainer $modal={useToModal}>
            <p>
                <span>Estimated total: </span>
                <span>${ totalPrice ?? 0 }</span>
            </p>
            <CartSummaryBtn $primary={true}>CHECKOUT</CartSummaryBtn>
        </CartSummaryContainer>
    )
}

const CartSummaryContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;

    ${({ $modal }) => $modal && css`
        padding: 24px 0px 0px;
        margin: 4px 0px 0px;
        border-top: 1px solid var(--grayscale-300);
    `}

    & > p {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0px 4px;
        margin: 0px 0px 12px;

        & > span {
            font-size: 15px;
            font-weight: 400;
            color: var(--grayscale-600);
        }
        & > span:last-of-type {
            font-size: 17px;
            font-weight: 500;
            color: var(--grayscale-800);
        }
    }
`;

const CartSummaryBtn = styled(CommonBtnMD)`
    width: 100%;
    padding: 12px;
    font-size: 18px;
`;