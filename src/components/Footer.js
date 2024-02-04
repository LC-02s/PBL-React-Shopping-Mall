import React from 'react'
import styled from 'styled-components'
import { CommonWrapper } from '../styles/styledModules';
import headerLogo from '../assets/header-logo.svg'
import { Link } from 'react-router-dom';

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

const FooterContainer = styled.footer`
    background-color: var(--grayscale-600);
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
