import React from 'react'
import { CartSummaryContainer, CartSummaryBtn } from './Cart.style'
import { useDispatch, useSelector } from 'react-redux'
import { modalOff } from '../../context/actions/modal'
import { useNavigate } from 'react-router-dom'

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
