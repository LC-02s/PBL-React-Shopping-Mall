import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { getAllProducts } from '../apis/product';
import { SkeletonBackground } from '../styles/styledModules'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RatingStar from './RatingStar'

export default function ProductList() {

    const { categoryToListView } = useSelector(({ product }) => product);

    const [ products, setProducts ] = useState(null);
    const [ isPending, setIsPending ] = useState(true);
    console.log(products);

    const navigate = useNavigate();

    useEffect(() => {
        setIsPending(true);
        setProducts(null);
        (async (category) => {
            const { status, data } = await getAllProducts({ sort: 'desc' }, category); 
            setIsPending(false);
            setProducts(status ? data : null);
        })(categoryToListView);
    }, [ categoryToListView ]);

    return (
        <React.Fragment>
            {
            isPending ?
                <ProductListContiner>
                    { new Array(8).fill('').map((_, idx) => <ProductItemSkeleton key={String(idx)} />) }
                </ProductListContiner> :
            products ? 
                <ProductListContiner>
                    {products.map(({ id, image, category, title, price, rating }) => (
                        <ProductItem key={String(id)} onClick={() => navigate(`/detail?product_id=${id}`)}>
                            <img src={image} alt={`${title} product`} />
                            <h3>{ title }</h3>
                            <p>{ price }</p>
                            <p><RatingStar /> { rating.rate } / { rating.count }</p>
                            <p>{ category }</p>
                        </ProductItem>
                    )) }
                </ProductListContiner> :
                <p>상품 목록이 존재하지 않습니다</p> 
            }
        </React.Fragment>
    )
}

const ProductItemSkeleton = () => {
    return (
        <SkeletonContainer>
            <SkeletonImg />
            <SkeletonTitle />
            <SkeletonTitle />
            <SkeletonPrice />
        </SkeletonContainer>
    )
}

// styled components
const SkeletonContainer = styled.li`
    display: block;
    width: 100%;
    height: auto;
`;
const SkeletonImg = styled(SkeletonBackground)`
    margin: 0px 0px 12px;
    aspect-ratio: 1;
    transition-delay: 0s;
`;
const SkeletonTitle = styled(SkeletonBackground)`
    width: 80%;
    height: 20px;

    & + & {
        width: 60%;
        margin: 4px 0px 8px;
    }
`;
const SkeletonPrice = styled(SkeletonBackground)`
    width: 40%;
    height: 24px;
    margin: 0px 0px 14px;
`;

const ProductListContiner = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 100%;
    height: auto;
    
    @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ProductItem = styled.li`
    display: block;
    width: 100%;
    height: auto;
    padding: 12px;
    border: 1px solid var(--grayscale-200);
    border-radius: 4px;
    background-color: var(--brand-white);
`;
