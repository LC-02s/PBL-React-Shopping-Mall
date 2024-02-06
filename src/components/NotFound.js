import React from 'react'
import styled from 'styled-components'

export default function NotFound({ content }) {
    return (
        <NotFoundContainer>
            <p>{ content ?? '404 : Page is Not Found' }</p>
        </NotFoundContainer>
    )
}

// styled components
export const NotFoundContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;
    padding: 60px 20px;
    border: 1px solid var(--grayscale-200);
    border-radius: 4px;
    background-color: var(--brand-white);

    & > p {
        position: relative;
        display: block;
        width: 100%;
        padding: 64px 0px 12px;
        font-size: 17px;
        font-weight: 600;
        color: var(--grayscale-500);
        word-break: keep-all;
        text-align: center;
    }
    & > p::before {
        content: "!";
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        display: block;
        width: 48px;
        height: 48px;
        margin: 0px auto;
        line-height: 48px;
        border-radius: 50%;
        border: 1px solid var(--grayscale-500);
        font-size: 18px;
        font-weight: 800;
        color: var(--grayscale-500);
        text-align: center;
    }
`;
