import React from 'react'
import { getAllCategories } from '../../apis/product';
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';
import { changeCategory } from '../../context/actions/product';
import { 
    ProductCategorySkeletonContainer, 
    ProductCategoryBtnSkeleton, 
    ProductCategoryContainer, 
    ProductCategoryBtn, 
    ProductCategoryErrorBox, 
} from './Product.style';

export default function ProductCategory() {
    
    const { categoryToListView } = useSelector(({ product }) => product);
    const [ fetchData, isPending ] = useFetchData(() => getAllCategories());
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {
            isPending ? 
                <ProductCategorySkeletonContainer>
                    {
                    new Array(4).fill('').map((_, idx) => (
                        <ProductCategoryBtnSkeleton key={String(idx)} />
                    ))
                    }
                </ProductCategorySkeletonContainer> :
            fetchData ?
                <ProductCategoryContainer>
                    <ProductCategoryBtn 
                        $active={!categoryToListView}
                        onClick={() => dispatch(changeCategory())}>
                            all</ProductCategoryBtn>
                    {
                    fetchData.map((category) => (
                        <ProductCategoryBtn 
                            $active={categoryToListView === category}
                            key={category} 
                            onClick={() => dispatch(changeCategory(category))}>
                                { category }</ProductCategoryBtn>
                    ))
                    }
                </ProductCategoryContainer> : 
                <ProductCategoryErrorBox as='p'>
                    카테고리 로딩에 실패하였습니다
                </ProductCategoryErrorBox>
            }
        </React.Fragment>
    )
}

