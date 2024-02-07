import React from 'react'
import { getAllProducts } from '../../apis/product'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import RatingOfStar from './RatingOfStar'
import useFetchData from '../../hooks/useFetchData'
import NotFound from '../NotFound'
import addCartIcon from '../../assets/cart-add-000.svg'
import { addCartItem } from '../../context/actions/cart'
import { 
    ProductListContiner, 
    ProductItem, 
    ProductItemPrice, 
    ProductItemRating, 
    ProductItemCartBtn, 
    ProductItemSkeletonContainer, 
    ProductItemSkeletonImg, 
    ProductItemSkeletonTitle, 
    ProductItemSkeletonPrice, 
} from './Product.style'

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
                                    <RatingOfStar persentage={rating.rate * 20} /> 
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
        <ProductItemSkeletonContainer>
            <ProductItemSkeletonImg />
            <ProductItemSkeletonTitle />
            <ProductItemSkeletonTitle />
            <ProductItemSkeletonPrice />
        </ProductItemSkeletonContainer>
    )
}
