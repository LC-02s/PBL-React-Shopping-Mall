import styled, { css } from "styled-components"
import { CommonBtnMD } from "../Common.style"

// List
export const CartListSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px;
    & > img {
        width: 32px;
        height: 32px;
    }
`;

export const CartListEmpty = styled.p`
    display: block;
    width: 100%;
    height: auto;
    padding: 12px;

    & > img {
        display: block;
        width: 48%;
        max-width: 180px;
        height: auto;
        margin: 0px auto 14px;
    }
    & > span {
        display: block;
        width: 100%;
        height: auto;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        color: var(--grayscale-600);
    }
    & ~ div {display: none!important;}
`;

export const CartListContainer = styled.ul`
    display: block;
    width: 100%;
    height: auto;
`;

export const CartListTitleWrap = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0px 0px 8px;
    margin: 0px 0px 12px;
    border-bottom: 1px solid var(--grayscale-300);

    & > h3 {
        font-size: 18px;
        font-weight: 700;
        color: var(--grayscale-800);
    }
    & > h3 > span {
        display: inline-block;
        margin-left: 12px;
        font-size: 15px;
        font-weight: 400;
        color: var(--grayscale-500);
    }
`;

export const CartListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    padding: 12px 0px;
    border-bottom: 1px solid var(--grayscale-200);

    &:last-of-type {border: none;}
    & > img {
        display: block;
        width: 80px;
        height: auto;
        border-radius: 4px;
        aspect-ratio: 1;
        object-fit: contain;
    }
    & > div {flex: 1;}
    & > div > div:first-of-type > a {
        display: block;
        width: 100%;
        height: auto;
        margin: 0px 0px 6px;
        font-size: 16px;
        font-weight: 400;
        color: var(--grayscale-700);
        line-height: 1.2;
        &:hover {text-decoration: underline;}
    }
    & > div > div:last-of-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0px 0px;

        & > button:last-of-type {
            padding: 4px 2px;
            font-size: 16px;
            font-weight: 500;
            color: var(--grayscale-600);
            transition: color 0.2s;
            &:hover {color: var(--ui-warning); text-decoration: underline;}
        }
    }
`;

export const CartListItemCountBtn = styled.p`
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--grayscale-200);
    border-radius: 4px;
    background-color: var(--brand-white);
    & > button,
    & > span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
    }
    & > button {
        transition: background 0.2s;
        &:hover {background-color: var(--grayscale-100);}
    }
    & > span {
        width: auto;
        min-width: 36px;
        padding: 0px 4px;
        border-left: 1px solid var(--grayscale-200);
        border-right: 1px solid var(--grayscale-200);
    }
`;

export const CartListItemPrice = styled.p`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    & > span {
        display: inline-block;
        font-size: 15px;
        font-weight: 400;
        color: var(--grayscale-500);
    }
    & > span:first-of-type {
        margin-right: 4px;
        font-size: 17px;
        font-weight: 500;
        color: var(--grayscale-700);
    }
`;
// List

// Summary
export const CartSummaryContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;

    ${({ $modal }) => $modal && css`
        padding: 24px 0px 0px;
        margin: 4px 0px 0px;
        border-top: 1px solid var(--grayscale-300);
    `}
    padding: 24px 0px 0px;
    margin: 4px 0px 0px;
    border-top: 1px solid var(--grayscale-300);

    & > p {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0px 4px;
        margin: 0px 0px 12px;

        & > span {
            font-size: 15px;
            font-weight: 400;
            color: var(--grayscale-600);
        }
        & > span:last-of-type {
            font-size: 17px;
            font-weight: 500;
            color: var(--grayscale-800);
        }
    }
`;

export const CartSummaryBtn = styled(CommonBtnMD)`
    width: 100%;
    padding: 12px;
    font-size: 18px;
`;
// Summary