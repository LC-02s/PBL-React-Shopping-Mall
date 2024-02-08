import React from 'react'
import { CartSummaryContainer, CartSummaryBtn, CartSummarySkeleton } from './Cart.style'
import { useDispatch, useSelector } from 'react-redux'
import { modalOff } from '../../context/actions/modal'
import { useNavigate } from 'react-router-dom'
import { getProductsToCart } from '../../context/actions/cart'

export default function CartSummary({ useToModal, useToPage }) {
    
    const dispatch = useDispatch();
    const { products } = useSelector(({ cart }) => cart);

    const navigate = useNavigate();
    const handleCheckOutBtnClick = () => {dispatch(modalOff()); dispatch(getProductsToCart()); navigate('/payment');}

    return (
        <CartSummaryContainer $modal={useToModal}>
            <p>
                <span>Estimated total: </span>
                {
                products.status === 'pending' ?
                    <CartSummarySkeleton as='span'></CartSummarySkeleton> :
                    <span>${ products.totalPrice ?? 0 }</span>
                }
            </p>
            {
            !useToPage &&
                <CartSummaryBtn onClick={handleCheckOutBtnClick} $primary={true}>CHECKOUT</CartSummaryBtn>
            }
        </CartSummaryContainer>
    )
}
