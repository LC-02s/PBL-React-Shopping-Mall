import React from 'react'
import styled, { css } from 'styled-components';
import { CommonBtnMD } from '../component.style';
import { useDispatch, useSelector } from 'react-redux';
import { modalOff } from '../../context/actions/modal';
import { useNavigate } from 'react-router-dom';

export default function CartSummary({ useToModal, useToPage }) {
    
    const dispatch = useDispatch();
    const { totalPrice } = useSelector(({ cart }) => cart);

    const navigate = useNavigate();
    const handleCheckOutBtnClick = () => {dispatch(modalOff()); navigate('/payment');}

    return (
        <CartSummaryContainer $modal={useToModal}>
            <p>
                <span>Estimated total: </span>
                <span>${ totalPrice ?? 0 }</span>
            </p>
            {
            !useToPage &&
                <CartSummaryBtn onClick={handleCheckOutBtnClick} $primary={true}>CHECKOUT</CartSummaryBtn>
            }
        </CartSummaryContainer>
    )
}

// styled components
const CartSummaryContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;

    ${({ $modal }) => $modal && css`
        padding: 24px 0px 0px;
        margin: 4px 0px 0px;
        border-top: 1px solid var(--grayscale-300);
    `}
    padding: 24px 0px 0px;
    margin: 4px 0px 0px;
    border-top: 1px solid var(--grayscale-300);

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