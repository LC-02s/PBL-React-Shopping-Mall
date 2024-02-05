import React from 'react'
import styled, { css } from 'styled-components'
import { getAllCategories } from '../apis/product';
import { SkeletonBackground } from '../styles/styledModules'
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from '../hooks/useFetchData';
import { changeCategory } from '../context/actions/product';

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
                <div>error</div>
            }
        </React.Fragment>
    )
}

// styled components
const ProductCategorySkeletonContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: auto;
    margin: 0px 0px 24px;
`;

const ProductCategoryBtnSkeleton = styled(SkeletonBackground)`
    width: 86px;
    height: 32px;
`;

const ProductCategoryContainer = styled(ProductCategorySkeletonContainer)`
    gap: 8px;
    padding: 12px 18px;
    border: 1px solid var(--grayscale-200);
    background-color: var(--brand-white);
    border-radius: 4px;
    @media (max-width: 768px) {justify-content: center;}
`;

const ProductCategoryBtn = styled.button`
    position: relative;
    display: inline-block;
    padding: 4px 12px;
    font-size: 15px;
    font-weight: ${({ $active }) => $active ? 700 : 500};
    color: ${({ $active }) => $active ? 'var(--ui-information)' : 'var(--grayscale-500)'};
    ${({ $active }) => $active && css`
        padding-left: 24px;
        &::before {
            content: '';
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 6px;
            width: 14px;
            height: 14px;
            margin: auto 0px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%233b84d8' d='M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0'/%3E%3C/g%3E%3C/svg%3E");
        }
    `};
`;
