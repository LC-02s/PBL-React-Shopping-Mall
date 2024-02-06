import React from 'react'
import styled from 'styled-components'
import { getProductDataById } from '../apis/product';
import useFetchData from '../hooks/useFetchData';
import NotFound from './NotFound';
import { ProductItemPrice, ProductItemCategory, ProductItemRating } from './ProductList'; 
import RatingStar from './RatingOfStars';
import addCartIcon from '../assets/cart-add-fff.svg'
import { useDispatch } from 'react-redux';
import { addCartItem } from '../context/actions/cart';
import { SkeletonBackground, CommonBtnMD } from '../styles/styledModules';
import { useNavigate } from 'react-router-dom';


export default function ProductDetail({ productId }) {
    
    const [ fetchData, isPending ] = useFetchData(() => getProductDataById(productId), productId);
    const dispatch = useDispatch();
    const { id, title, image, price, rating, description, category } = fetchData ?? {};

    const navigate = useNavigate();
    const handleJumpToPaymentClick = (id) => {dispatch(addCartItem(id)); navigate('/payment');}

    return (
        <React.Fragment>
            {
            isPending ? 
                <ProductDetailSkeleton /> :
            fetchData ?
                <ProductDetailContainer>
                    <ProductDetailImgWrap>
                        <img src={image} alt={`${title} detail photoshoot`} />
                    </ProductDetailImgWrap>
                    <ProductDetailContentWrap>
                        <ProductDetailTitle>{ title }</ProductDetailTitle>
                        <ProductDetailDescirption>
                            { description }
                        </ProductDetailDescirption>
                        <ProductItemCategory>{ category }</ProductItemCategory>
                        <ProductDetailBtnWrap>
                            <div>
                                <ProductItemPrice>${ price }</ProductItemPrice>
                                <ProductItemRating>
                                    <RatingStar persentage={rating.rate * 20} /> 
                                    <p>{ rating.rate } <span>/ { rating.count }</span></p>
                                </ProductItemRating>
                            </div>
                            <div>
                                <CommonBtnMD onClick={() => handleJumpToPaymentClick(id)}>
                                    바로 구매하기
                                </CommonBtnMD>
                                <CommonBtnMD $iconBtn={true} $primary={true} onClick={() => dispatch(addCartItem(id))}>
                                    <img src={addCartIcon} alt='add cart icon' />
                                    장바구니 담기
                                </CommonBtnMD>
                            </div>
                        </ProductDetailBtnWrap>
                    </ProductDetailContentWrap>
                </ProductDetailContainer> : 
                <NotFound content='상품 상세정보를 찾을 수 없습니다' />
            }
        </React.Fragment>
    )
}

const ProductDetailSkeleton = () => {
    return (
        <ProductDetailSkeletonContainer>
            <ProductDetailSkeletonImg />
            <ProductDetailSkeletonArticle>
                <SkeletonBackground />
                <SkeletonBackground />
                <SkeletonBackground />
                <SkeletonBackground />
                <div>
                    <SkeletonBackground />
                    <SkeletonBackground />
                </div>
            </ProductDetailSkeletonArticle>
        </ProductDetailSkeletonContainer>
    )
}

// styled components
const ProductDetailSkeletonContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width: 768px) {
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }
`;
const ProductDetailSkeletonImg = styled(SkeletonBackground)`
    width: 180px;
    aspect-ratio: 1;
    @media (max-width: 768px) {width: 100%; margin: 0px 0px 24px; aspect-ratio: 2;}
`;
const ProductDetailSkeletonArticle = styled.div`
    width: calc(100% - 204px);
    & ${SkeletonBackground} {
        width: 100%;
        height: 24px;
    }
    & ${SkeletonBackground} + ${SkeletonBackground} {
        margin: 6px 0px 0px;
    }
    & > ${SkeletonBackground}:first-of-type {
        height: 32px;
        margin: 0px 0px 16px;
    }
    & > ${SkeletonBackground}:nth-of-type(4) {
        width: 32%;
    }
    & div:last-of-type {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 60%;
        margin: 20px 0px 0px;
        & > ${SkeletonBackground} {
            height: 28px;
            margin: 0px 8px 0px 0px;
        }
    }
    @media (max-width: 768px) {width: 100%;}
`

const ProductDetailImgWrap = styled.div`
    display: block;
    width: 100%;
    height: auto;

    & > img {
        aspect-ratio: 1;
        object-fit: contain;
    }
`;

const ProductDetailContentWrap = styled.div`
    display: block;
    width: 100%;
    height: auto;
`;

const ProductDetailContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding: 40px;
    border: 1px solid var(--grayscale-200);
    border-radius: 4px;
    background-color: var(--brand-white);

    & > ${ProductDetailImgWrap} {width: 280px;}
    & > ${ProductDetailContentWrap} {width: calc(100% - 320px);}
    
    @media (max-width: 1024px) {
        & > ${ProductDetailImgWrap} {width: 32%;}
        & > ${ProductDetailContentWrap} {width: calc(68% - 24px);}
    }
    @media (max-width: 768px) {
        flex-flow: column nowrap;
        align-items: center;
        padding: 32px;
        & > ${ProductDetailImgWrap} {width: 60%; margin: 0px 0px 48px;}
        & > ${ProductDetailContentWrap} {width: 100%;}
    }
`;

const ProductDetailTitle = styled.div`
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 18px;
    font-size: 18px;
    font-weight: 600;
    color: var(--grayscale-800);
    line-height: 1.2;
`;

const ProductDetailDescirption = styled.div`
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 8px;
    font-size: 16px;
    font-weight: 400;
    color: var(--grayscale-600);
    line-height: 1.6;
`;

const ProductDetailBtnWrap = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 12px 32px;
    margin: 24px 0px 0px;
    & > div:last-of-type {
        display: flex;
        justify-content: flex-end;
    }
    & ${CommonBtnMD} {padding: 8px 14px;}
    & ${CommonBtnMD}:last-of-type {padding: 8px 14px 8px 10px;}
    @media (max-width: 1024px) {justify-content: space-between;}
`;

/*
const AddCartBtn = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: 8px 16px 8px 12px;
    font-size: 17px;
    font-weight: 500;
    color: var(--brand-white);
    border-radius: 4px;
    background-color: #414143;
    transition: background 0.2s;
    &:hover {background-color: #FCB041;}
    & > img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
`;
*/