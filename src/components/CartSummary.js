import React from 'react'
import { useSelector } from 'react-redux'

export default function CartSummary() {

    const cartList = useSelector(({ cart }) => cart);

    return (
        <div>CartSummary</div>
    )
}
