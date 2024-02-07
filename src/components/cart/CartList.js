import React from 'react'
import { PlainModalCloseBtn } from '../CommonModal'
import closeIcon from '../../assets/close.svg'
import { modalOff } from '../../context/actions/modal'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { limitCharacter } from '../product/ProductList'
import spinnerBars from '../../assets/spinner-bars.svg'
import { minusCartItem, plusCartItem, removeCartItem } from '../../context/actions/cart'
import emptyCartIcon from '../../assets/cart-animated.webp'
import NotFound from '../NotFound'
import {
    CartListTitleWrap, 
    CartListEmpty, 
    CartListContainer, 
    CartListSpinner, 
    CartListItem, 
    CartListItemPrice, 
    CartListItemCountBtn, 
} from './Cart.style'


export default function CartList({ useToModal }) {
    
    const { itemLength, products } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            { 
            useToModal && 
                <CartListTitleWrap>
                    <h3>My Cart <span>{ itemLength } item</span></h3>
                    <PlainModalCloseBtn onClick={() => dispatch(modalOff())}>
                        <img src={closeIcon} alt='close icon' />
                    </PlainModalCloseBtn>
                </CartListTitleWrap> 
            }
            {
            itemLength === 0 ?
                <CartListEmpty>
                    <img src={emptyCartIcon} alt='empty cart icon' />
                    <span>Your Cart is Empty!!</span>
                </CartListEmpty> :
            products.status === 'pending' ? 
                <CartListSpinner><img src={spinnerBars} alt='loading...' /></CartListSpinner> : 
            products.status === 'fulfilled' ? 
                <CartListContainer>
                    {
                    products.data.map(({ id, image, price, title, length }, idx) => (
                        <CartListItem key={id}>
                            <img src={image} alt={`${title} photoshoot`} />
                            <div>
                                <div>
                                    <Link to={`/detail/${id}`} onClick={() => dispatch(modalOff())}>
                                        { limitCharacter(title, 40) }
                                    </Link>
                                    <CartListItemPrice>
                                        <span>${ (price * length).toFixed(2) }</span>
                                        <span>(${ price }</span>
                                        <span>x</span>
                                        <span>{ length })</span>
                                    </CartListItemPrice>
                                </div>
                                <div>
                                    <button onClick={() => dispatch(removeCartItem({ id, idx }))}>Remove</button>
                                    <CartListItemCountBtn>
                                        <button onClick={() => dispatch(minusCartItem({ id, idx }))}> - </button>
                                        <span>{ length }</span>
                                        <button onClick={() => dispatch(plusCartItem({ id, idx }))}> + </button>
                                    </CartListItemCountBtn>
                                </div>
                            </div>
                        </CartListItem> 
                    ))}
                </CartListContainer> : 
                <NotFound content='장바구니 조회에 실패했습니다' />
            }
        </React.Fragment>
    )
}