import React, { useMemo } from 'react'
import { PlainModalCloseBtn } from '../CommonModal'
import closeIcon from '../../assets/close.svg'
import { modalOff } from '../../context/actions/modal'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToCart } from '../../apis/product'
import useFetchData from '../../hooks/useFetchData'
import { Link } from 'react-router-dom'
import { limitCharacter } from '../product/ProductList'
import spinnerBars from '../../assets/spinner-bars.svg'
import { addCartItem, minusCartItem, deleteCartItem } from '../../context/actions/cart'
import emptyCartIcon from '../../assets/cart-animated.webp'
import NotFound from '../NotFound'
import CartSummary from './CartSummary'
import {
    CartListTitleWrap, 
    CartListEmpty, 
    CartListContainer, 
    CartListSpinner, 
    CartListItem, 
    CartListItemPrice, 
    CartListItemCountBtn, 
} from './Cart.style'


export default function CartList({ useToModal, useToPage }) {
    
    const cartList = useSelector(({ cart }) => cart.items);
    const [ fetchData, isPending ] = useFetchData(() => getProductsToCart(cartList), cartList);
    const cartLength = useMemo(() => Object.keys(cartList).length, [ cartList ]);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            { 
            useToModal && 
                <CartListTitleWrap>
                    <h3>My Cart <span>{ cartLength } item</span></h3>
                    <PlainModalCloseBtn onClick={() => dispatch(modalOff())}>
                        <img src={closeIcon} alt='close icon' />
                    </PlainModalCloseBtn>
                </CartListTitleWrap> 
            }
            {
            cartLength === 0 ?
                <CartListEmpty>
                    <img src={emptyCartIcon} alt='empty cart icon' />
                    <span>Your Cart is Empty!!</span>
                </CartListEmpty> :
            isPending ? 
                <CartListSpinner><img src={spinnerBars} alt='loading...' /></CartListSpinner> : 
            fetchData.cartItems ? 
                <React.Fragment>
                    <CartListContainer>
                        {
                        fetchData.cartItems.map(({ id, image, price, title }) => (
                            <CartListItem key={id}>
                                <img src={image} alt={`${title} photoshoot`} />
                                <div>
                                    <div>
                                        <Link to={`/detail/${id}`} onClick={() => dispatch(modalOff())}>
                                            { limitCharacter(title, 40) }
                                        </Link>
                                        <CartListItemPrice>
                                            <span>${ (price * cartList[id]).toFixed(2) }</span>
                                            <span>(${ price }</span>
                                            <span>x</span>
                                            <span>{ cartList[id] })</span>
                                        </CartListItemPrice>
                                    </div>
                                    <div>
                                        <button onClick={() => dispatch(deleteCartItem(id))}>Remove</button>
                                        <CartListItemCountBtn>
                                            <button onClick={() => dispatch(minusCartItem(id))}> - </button>
                                            <span>{ cartList[id] }</span>
                                            <button onClick={() => dispatch(addCartItem(id))}> + </button>
                                        </CartListItemCountBtn>
                                    </div>
                                </div>
                            </CartListItem> 
                        ))}
                    </CartListContainer> 
                    <CartSummary totalPrice={fetchData.totalPrice} useToModal={useToModal} useToPage={useToPage} />
                </React.Fragment> : 
                <NotFound content='장바구니 조회에 실패했습니다' />
            }
        </React.Fragment>
    )
}