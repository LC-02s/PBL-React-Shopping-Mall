import React from 'react';
import { MainTitle } from './ProductListPage';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/product/ProductDetail';

export default function ProductDetailPage() {

    const { id } = useParams();

    return (
        <React.Fragment>
            <MainTitle>Product Detail</MainTitle>
            <ProductDetail productId={id}/>
        </React.Fragment>
    )
}
