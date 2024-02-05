import React, { useMemo } from 'react'
import styled from 'styled-components'
import { PlainModalCloseBtn } from './CommonModal'
import closeIcon from '../assets/close.svg'
import { modalOff } from '../context/actions/modal'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToCart } from '../apis/product'
import useFetchData from '../hooks/useFetchData'
import { Link } from 'react-router-dom'
import { limitCharacter } from './ProductList'
import spinnerBars from '../assets/spinner-bars.svg'
import { addCartItem, minusCartItem, deleteCartItem } from '../context/actions/cart'
import emptyCartIcon from '../assets/cart-animated.webp'
import NotFound from './NotFound'
import CartSummary from './CartSummary'


export default function CartList({ useToModal }) {
    
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
                    <CartSummary totalPrice={fetchData.totalPrice} useToModal={useToModal} />
                </React.Fragment> : 
                <NotFound content='장바구니 조회에 실패했습니다' />
            }
        </React.Fragment>
    )
}

// styled components
const CartListSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px;
    & > img {
        width: 32px;
        height: 32px;
    }
`;

const CartListEmpty = styled.p`
    display: block;
    width: 100%;
    height: auto;
    padding: 12px;

    & > img {
        display: block;
        width: 48%;
        height: auto;
        margin: 0px auto 14px;
    }
    & > span {
        display: block;
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        color: var(--grayscale-600);
    }
    & ~ div {display: none!important;}
`;

const CartListContainer = styled.ul`
    display: block;
    width: 100%;
    height: auto;
`;

const CartListTitleWrap = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0px 0px 8px;
    margin: 0px 0px 12px;
    border-bottom: 1px solid var(--grayscale-300);

    & > h3 {
        font-size: 18px;
        font-weight: 700;
        color: var(--grayscale-800);
    }
    & > h3 > span {
        display: inline-block;
        margin-left: 12px;
        font-size: 15px;
        font-weight: 400;
        color: var(--grayscale-500);
    }
`;

const CartListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    padding: 12px 0px;
    border-bottom: 1px solid var(--grayscale-200);

    &:last-of-type {border: none;}
    & > img {
        display: block;
        width: 80px;
        height: auto;
        border-radius: 4px;
        aspect-ratio: 1;
        object-fit: contain;
    }
    & > div {flex: 1;}
    & > div > div:first-of-type > a {
        display: block;
        width: 100%;
        height: auto;
        margin: 0px 0px 6px;
        font-size: 16px;
        font-weight: 400;
        color: var(--grayscale-700);
        line-height: 1.2;
        &:hover {text-decoration: underline;}
    }
    & > div > div:last-of-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0px 0px;

        & > button:last-of-type {
            padding: 4px 2px;
            font-size: 16px;
            font-weight: 500;
            color: var(--grayscale-600);
            transition: color 0.2s;
            &:hover {color: var(--ui-warning); text-decoration: underline;}
        }
    }
`;

const CartListItemCountBtn = styled.p`
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--grayscale-200);
    border-radius: 4px;
    & > button,
    & > span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
    }
    & > button {
        transition: background 0.2s;
        &:hover {background-color: var(--grayscale-100);}
    }
    & > span {
        width: auto;
        min-width: 36px;
        padding: 0px 4px;
        border-left: 1px solid var(--grayscale-200);
        border-right: 1px solid var(--grayscale-200);
    }
`;

const CartListItemPrice = styled.p`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    & > span {
        display: inline-block;
        font-size: 15px;
        font-weight: 400;
        color: var(--grayscale-500);
    }
    & > span:first-of-type {
        margin-right: 4px;
        font-size: 17px;
        font-weight: 500;
        color: var(--grayscale-700);
    }
`;