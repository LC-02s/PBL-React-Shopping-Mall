import styled, { css } from "styled-components";
import { CommonBtnMD, SkeletonBackground } from "../Common.style";

// List
export const ProductItemSkeletonContainer = styled.li`
    display: block;
    width: 100%;
    height: auto;
`;
export const ProductItemSkeletonImg = styled(SkeletonBackground)`
    margin: 0px 0px 12px;
    aspect-ratio: 1;
    transition-delay: 0s;
`;
export const ProductItemSkeletonTitle = styled(SkeletonBackground)`
    width: 80%;
    height: 20px;

    & + & {
        width: 60%;
        margin: 4px 0px 8px;
    }
`;
export const ProductItemSkeletonPrice = styled(SkeletonBackground)`
    width: 40%;
    height: 24px;
    margin: 0px 0px 14px;
`;

export const ProductListContiner = styled.ul`
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

export const ProductItem = styled.li`
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

export const ProductItemCartBtn = styled.button`
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
// List


// Category
export const ProductCategorySkeletonContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: auto;
    margin: 0px 0px 24px;
`;

export const ProductCategoryBtnSkeleton = styled(SkeletonBackground)`
    width: 86px;
    height: 32px;
`;

export const ProductCategoryContainer = styled(ProductCategorySkeletonContainer)`
    gap: 8px;
    padding: 12px 18px;
    border: 1px solid var(--grayscale-200);
    background-color: var(--brand-white);
    border-radius: 4px;
    @media (max-width: 768px) {justify-content: center;}
`;

export const ProductCategoryBtn = styled.button`
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

export const ProductCategoryErrorBox = styled(ProductCategoryContainer)`
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
// Category

export const ProductDetailSkeletonContainer = styled.div`
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

export const ProductDetailSkeletonImg = styled(SkeletonBackground)`
    width: 180px;
    aspect-ratio: 1;
    @media (max-width: 768px) {width: 100%; margin: 0px 0px 24px; aspect-ratio: 2;}
`;

export const ProductDetailSkeletonArticle = styled.div`
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

// Detail
export const ProductDetailImgWrap = styled.div`
    display: block;
    width: 100%;
    height: auto;

    & > img {
        aspect-ratio: 1;
        object-fit: contain;
    }
`;

export const ProductDetailContentWrap = styled.div`
    display: block;
    width: 100%;
    height: auto;
`;

export const ProductDetailContainer = styled.div`
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

export const ProductDetailTitle = styled.div`
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 18px;
    font-size: 18px;
    font-weight: 600;
    color: var(--grayscale-800);
    line-height: 1.2;
`;

export const ProductDetailDescirption = styled.div`
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 8px;
    font-size: 16px;
    font-weight: 400;
    color: var(--grayscale-600);
    line-height: 1.6;
`;

export const ProductDetailBtnWrap = styled.div`
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
export const AddCartBtn = styled.button`
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
// Detail
