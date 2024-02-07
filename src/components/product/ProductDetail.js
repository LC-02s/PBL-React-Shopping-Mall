import React from 'react'
import { getProductDataById } from '../../apis/product';
import useFetchData from '../../hooks/useFetchData';
import NotFound from '../NotFound';
import { ProductItemPrice, ProductItemCategory, ProductItemRating } from '../product/Product.style'; 
import RatingOfStar from '../product/RatingOfStar';
import addCartIcon from '../../assets/cart-add-fff.svg'
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../context/actions/cart';
import { SkeletonBackground, CommonBtnMD } from '../Common.style';
import { 
    ProductDetailSkeletonContainer, 
    ProductDetailSkeletonArticle, 
    ProductDetailSkeletonImg, 
    ProductDetailContainer, 
    ProductDetailImgWrap, 
    ProductDetailContentWrap, 
    ProductDetailTitle, 
    ProductDetailDescirption, 
    ProductDetailBtnWrap, 
} from '../product/Product.style'
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
                                    <RatingOfStar persentage={rating.rate * 20} />
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