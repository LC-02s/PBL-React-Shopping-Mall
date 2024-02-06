import React from 'react'
import styled from 'styled-components'
import { getAllProducts } from '../../apis/product'
import { SkeletonBackground } from '../component.style'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import RatingStar from './RatingOfStars'
import useFetchData from '../../hooks/useFetchData'
import NotFound from '../NotFound'
import addCartIcon from '../../assets/cart-add-000.svg'
import { addCartItem } from '../../context/actions/cart'

export default function ProductList() {

    const { categoryToListView } = useSelector(({ product }) => product);
    const [ fetchData, isPending ] = useFetchData(() => getAllProducts({ sort: 'desc' }, categoryToListView), categoryToListView);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {
            isPending ?
                <ProductListContiner>
                    { new Array(8).fill('').map((_, idx) => <ProductItemSkeleton key={String(idx)} />) }
                </ProductListContiner> :
            fetchData ? 
                <ProductListContiner>
                    {fetchData.map(({ id, image, title, price, rating }) => (
                        <ProductItem key={String(id)}>
                            <div>
                                <img src={image} alt={`${title} product`} />
                                <h3>
                                    <Link to={`/detail/${id}`}>{ limitCharacter(title, 50) }</Link>
                                </h3>
                            </div>
                            <div>
                                <ProductItemPrice>${ price }</ProductItemPrice>
                                <ProductItemRating>
                                    <RatingStar persentage={rating.rate * 20} /> 
                                    <p>{ rating.rate } <span>/ { rating.count }</span></p>
                                </ProductItemRating>
                            </div>
                            <ProductItemCartBtn onClick={() => dispatch(addCartItem(id))}>
                                <img src={addCartIcon} alt='add cart icon' />
                            </ProductItemCartBtn>
                        </ProductItem>
                    )) }
                </ProductListContiner> :
                <NotFound content='상품 목록이 존재하지 않습니다' />
            }
        </React.Fragment>
    )
}

export const limitCharacter = (char, limit) => {
    if (char.length >= limit) {
        return String(char).slice(0, limit) + '...';
    } else return char;
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
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: 100%;
    padding: 12px;
    border: 1px solid var(--grayscale-200);
    border-radius: 4px;
    background-color: var(--brand-white);
    transition: border 0.2s, box-shadow 0.3s;

    &:hover {
        border-color: #414143;
        box-shadow: 0px 0px 0px 4px rgba(65,65,67,0.3);
    }
    & > div:first-of-type {
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: stretch;
        height: 100%;
    }
    & img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0px 0px 12px;
        aspect-ratio: 1;
        object-fit: contain;
    }
    & h3 {
        display: block;
        width: 100%;
        height: auto;
        margin: auto 0px;
    }
    & h3 > a {
        display: block;
        width: 100%;
        height: auto;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.2;
        color: var(--grayscale-700);
        word-break: keep-all;
    }
    & h3 > a:hover,
    & h3 > a:focus {text-decoration: underline;}
`;

export const ProductItemRating = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    width: 100%;
    height: auto;

    & > p:last-of-type {
        font-size: 14px;
        font-weight: 400;
        color: var(--grayscale-700);

        & > span {
            font-size: 12px;
            font-weight: inherit;
            color: var(--grayscale-400);
        }
    }
`;

export const ProductItemPrice = styled.p`
    display: block;
    width: 100%;
    height: auto;
    margin: 8px 0px 4px;
    font-size: 18px;
    font-weight: 600;
    color: var(--grayscale-800);
`;

export const ProductItemCategory = styled.p`
    display: block;
    width: 100%;
    height: auto;
    margin: 4px 0px 0px;
    font-size: 15px;
    font-weight: 400;
    color: var(--grayscale-500);
`;

const ProductItemCartBtn = styled.button`
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: inline-block;
    width: 42px;
    height: 42px;
    padding: 8px;
    border-radius: 50%;
    border: 1px solid var(--grayscale-200);
    outline-color: black;
    background-color: var(--brand-white);
    transition: background 0.2s;
    &:hover {background-color: var(--grayscale-100);}
`;