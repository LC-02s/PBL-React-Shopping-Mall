import React from 'react'
import styled, { css } from 'styled-components'
import { getAllCategories } from '../../apis/product';
import { SkeletonBackground } from '../component.style'
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';
import { changeCategory } from '../../context/actions/product';

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
    transition: padding 0.2s;
    &::before {content: ''; opacity: 0; transition: opacity 0.3s; transition-delay: 0.1s;}
    ${({ $active }) => $active && css`
        padding-left: 24px;
        &::before {
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
            opacity: 1;
        }
    `};
`;

const ProductCategoryErrorBox = styled(ProductCategoryContainer)`
    background-color: #FFE9E9;
    font-size: 16px;
    font-weight: 500;
    color: var(--ui-warning);
    border-color: var(--ui-warning);

    &::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23e14b4d' d='M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 16a1 1 0 1 0 0-2a1 1 0 0 0 0 2'/%3E%3Cpath fill='%23e14b4d' fill-rule='evenodd' d='M8.723 2.051c1.444-.494 2.34-.801 3.277-.801c.938 0 1.833.307 3.277.801l.727.25c1.481.506 2.625.898 3.443 1.23c.412.167.767.33 1.052.495c.275.16.55.359.737.626c.185.263.281.587.341.9c.063.324.1.713.125 1.16c.048.886.048 2.102.048 3.678v1.601c0 6.101-4.608 9.026-7.348 10.224l-.027.011c-.34.149-.66.288-1.027.382c-.387.1-.799.142-1.348.142c-.55 0-.96-.042-1.348-.142c-.367-.094-.687-.233-1.027-.382l-.027-.011C6.858 21.017 2.25 18.092 2.25 11.99v-1.6c0-1.576 0-2.792.048-3.679c.025-.446.062-.835.125-1.16c.06-.312.156-.636.34-.9c.188-.266.463-.465.738-.625c.285-.165.64-.328 1.052-.495c.818-.332 1.962-.724 3.443-1.23zM12 2.75c-.658 0-1.305.212-2.92.764l-.572.196c-1.513.518-2.616.896-3.39 1.21a7.137 7.137 0 0 0-.864.404a1.648 1.648 0 0 0-.208.139a.386.386 0 0 0-.055.05a.409.409 0 0 0-.032.074c-.02.056-.042.136-.063.248a7.438 7.438 0 0 0-.1.958c-.046.841-.046 2.015-.046 3.624v1.574c0 5.176 3.87 7.723 6.449 8.849c.371.162.586.254.825.315c.228.059.506.095.976.095s.748-.036.976-.095c.24-.06.454-.153.825-.315c2.58-1.126 6.449-3.674 6.449-8.849v-1.574c0-1.609 0-2.783-.046-3.624a7.423 7.423 0 0 0-.1-.958a1.738 1.738 0 0 0-.063-.248a.408.408 0 0 0-.032-.074a.385.385 0 0 0-.055-.05a1.64 1.64 0 0 0-.208-.14a7.135 7.135 0 0 0-.864-.402c-.774-.315-1.877-.693-3.39-1.21l-.573-.197C13.305 2.962 12.658 2.75 12 2.75' clip-rule='evenodd'/%3E%3C/svg%3E");
    }
`
