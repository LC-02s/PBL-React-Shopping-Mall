import React, { useEffect, useRef, useState } from 'react'
import headerLogo from '../assets/header-logo.svg'
import cartPlusIcon from '../assets/cart-plus.svg'
import cartCheckIcon from '../assets/cart-check.svg'
import registerIcon from '../assets/register.svg'
import loginIcon from '../assets/login.svg'
import logoutIcon from '../assets/logout.svg'
import styled, { css } from 'styled-components'
import { CommonWrapper } from '../styles/styledModules'
import { Link } from 'react-router-dom'

export default function Header() {

    const headerRef = useRef();
    const [ isScroll, setIsScroll ] = useState(false);

    useEffect(() => {
        const headerScroll = () => {
            setIsScroll(window.scrollY > headerRef.current.offsetHeight);
        }
        window.addEventListener('scroll', headerScroll);
        return () => window.removeEventListener('scroll', headerScroll);
    }, []);

    return (
        <HeaderContainer ref={headerRef} $isScroll={isScroll} style={{
            
        }}>
            <HeaderWrapper>
                <HeaderLogo>
                    <Link to='/'><img src={headerLogo} alt='Shop PBL Logo' /></Link>
                </HeaderLogo>
                <HeaderBtnWrap>
                    <CartBtn>
                        <CartLengthBadge>0</CartLengthBadge>
                        <img src={true ? cartCheckIcon : cartPlusIcon} alt={true ? 'checked cart icon' : 'empty cart icon'} />
                    </CartBtn>
                    <HeaderBtn>
                        <img src={registerIcon} alt='register icon' />
                        <span>회원가입</span>
                    </HeaderBtn>
                    <HeaderBtn>
                        <img src={logoutIcon} alt='logout icon' />
                        <span>로그아웃</span>
                    </HeaderBtn>
                    <HeaderBtn $primary={true}>
                        <img src={loginIcon} alt='login icon' />
                        <span>로그인</span>
                    </HeaderBtn>
                </HeaderBtnWrap>
            </HeaderWrapper>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    position: ${({ $isScroll }) =>  $isScroll ? 'fixed' : 'absolute'};
    z-index: 9999;
    top: 0px;
    left: 0px;
    right: 0px;
    border-bottom: 1px solid var(--grayscale-200);
    background-color: var(--brand-white);
    ${({ $isScroll }) =>  $isScroll ? 
        css`animation: headerScrollForward 0.2s ease-in-out;` : 
        css`animation: headerScrollBackward 0.1s ease-in;`
    };

    @keyframes headerScrollForward {
        from { top: -32px; }
        to { top: 0px; }
    }
    @keyframes headerScrollBackward {
        from { top: 16px; }
        to { top: 0px; }
    }
`;

const HeaderWrapper = styled(CommonWrapper)`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
`;

const HeaderLogo = styled.h1`
    display: block;
    width: auto;
    height: auto;

    & > a,
    & > a img {
        display: inline-block;
        width: 160px;
        height: auto;
    }
`;

const HeaderBtnWrap = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    width: auto;
`;

const CartLengthBadge = styled.span`
    position: absolute;
    top: -4px;
    right: -4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    font-size: 12px;
    font-weight: 600;
    color: var(--brand-white);
    border-radius: 50%;
    background-color: #49DAC2;
`;
const CartBtn = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: 6px;
    margin-right: 16px;
    border-radius: 50%;
    transition: background 0.2s;
    
    &:hover {
        background-color: var(--grayscale-200);
    }

    & > img {
        width: 28px;
        height: 28px;
        color: var(--grayscale-700);
    }
`;

const HeaderBtn = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    padding: 4px 12px 4px 8px;
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

    & + & {
        margin-left: 8px;
    }

    &:hover {
        background-color: var(--grayscale-200);
    }

    & > img {
        width: 20px;
        height: 20px;
        margin-right: 6px;
    }
`;
