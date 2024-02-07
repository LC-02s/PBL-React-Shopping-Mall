import React from 'react'
import styled from 'styled-components'
import { CommonWrapper } from './Common.style'
import headerLogo from '../assets/header-logo.svg'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <FooterContainer>
            <FooterWrapper>
                <Link to='/'><img src={headerLogo} alt='Shop PBL Logo' /></Link>
                <p>© 2024 LC-02s All Rights Reserved.</p>
            </FooterWrapper>
        </FooterContainer>
    )
}

// styled components
const FooterContainer = styled.footer`
    position: relative;
    background-color: var(--grayscale-600);
    overflow: hidden;
    padding: 100px 0px 0px;

    &::before{ 
        content:'';
        position: absolute;
        z-index: 3;
        pointer-events: none;
        background-repeat: no-repeat;
        bottom: -0.1vw;
        left: -0.1vw;
        right: -0.1vw;
        top: -0.1vw; 
        background-size: 100% 82px;
        background-position: 50% 0%;  background-image: url('data:image/svg+xml;charset=utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 381 77.25" preserveAspectRatio="none"><g fill="%23eef1f3"><path d="M381 8.47L0 42.33V0h381z"/><path d="M381 33.87L0 59.27V0h381z" opacity=".33"/><path d="M381 59.27L0 77.25V0h381z" opacity=".33"/></g></svg>'); 

        @media (min-width:2100px) {background-size: 100% calc(2vw + 82px);}
    }

`;

const FooterWrapper = styled(CommonWrapper)`
    padding-top: 40px;
    padding-bottom: 40px;

    & > a {
        display: inline-block;
        filter: grayscale(1);
    }

    & > a img {
        display: block;
        width: 160px;
        height: auto;
    }

    & > p {
        margin: 16px 0px 0px;
        font-size: 15px;
        font-weight: 500;
        color: var(--grayscale-200);
        word-break: keep-all;
    }
`;
