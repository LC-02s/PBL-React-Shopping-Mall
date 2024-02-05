import styled, { css } from "styled-components";

export const CommonWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    max-width: 1280px;
    height: auto;
    margin: 0px auto;
    padding: 0px 40px;

    @media (max-width: 1200px) {
        padding: 0px 30px;
    }
    @media (max-width: 1024px) {
        padding: 0px 24px;
    }
    @media (max-width: 768px) {
        padding: 0px 20px;
    }
`;

export const Contents = styled.section`
    position: relative;
    display: block;
    width: 100%;
    max-width: 1280px;
    height: auto;
    min-height: calc(100vh - 262px);
    margin: 0px auto;
    padding: 120px 40px 100px;

    @media (max-width: 1200px) {
        padding: 100px 30px 80px;
    }
    @media (max-width: 1024px) {
        padding: 100px 24px 60px;
    }
    @media (max-width: 768px) {
        padding: 80px 20px 40px;
    }
`;

export const CommonBtnMD = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: 4px 12px;
    ${({ $iconBtn }) => $iconBtn && css`
        padding: 4px 12px 4px 8px;
    `}
    font-size: 16px;
    font-weight: 500;
    color: var(--grayscale-800);
    border-radius: 4px;
    background-color: var(--grayscale-100);
    transition: background 0.2s;

    ${({ $primary }) => $primary && css`
        color: var(--brand-white);
        background-color: #414143;
        &:hover {background-color: #FCB041 !important;}
    `}

    & + & {margin-left: 8px;}
    &:hover {background-color: var(--grayscale-200);}
    & > img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
    }
`;

export const SkeletonBackground = styled.div`
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
    background: linear-gradient(100deg, rgba(169,181,188,1) 1%, rgba(216,223,227,1) 36%, rgba(216,223,227,1) 42%, rgba(169,181,188,1) 99%);
    background-size:360% 100%;
    background-position: left;
    animation-fill-mode: both;
    animation: loader 0.8s infinite alternate;

    @keyframes loader { 0% {background-position: right} }
`;