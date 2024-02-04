import React from 'react'
import {
    FormEl,
    FormTitle,
    FormFieldset,
    FormBtn,
    FormErrorMessage
} from './RegisterForm'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { modalOff } from '../context/actions/modal'
import closeIcon from '../assets/close.svg'

export default function LoginForm() {
    
    const dispatch = useDispatch();

    return (
        <FormEl style={{ position: 'relative' }}>
            <FormTitle>Login</FormTitle>
            <ModalCloseBtn onClick={() => dispatch(modalOff())}>
                <img src={closeIcon} alt='close' />
            </ModalCloseBtn>
            <FormFieldset>
                <label htmlFor='email'>이메일</label>
                <input type='email' name='email' />
                { false && <FormErrorMessage></FormErrorMessage> }
            </FormFieldset>
            <FormFieldset>
                <label htmlFor='password'>비밀번호</label>
                <input type='password' name='password' autoComplete='off' />
                { false && <FormErrorMessage></FormErrorMessage> }
            </FormFieldset>
            <FormBtn>로그인</FormBtn>
            <FormRegisterLink>
                <Link to={'/register'} onClick={() => dispatch(modalOff())}>회원이 아니신가요!?</Link>
            </FormRegisterLink>
        </FormEl>
    )
}

export const FormRegisterLink = styled.p`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 28px 42px;

    & > a {
        display: inline-block;
        padding: 4px;
        font-size: 15px;
        font-weight: 400;
        color: var(--grayscale-600);
    }
`;

const ModalCloseBtn = styled.button`
    position: absolute;
    top: -14px;
    right: -14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border: 1px solid var(--grayscale-200);
    outline-color: black;
    border-radius: 50%;
    background-color: var(--brand-white);
    transition: background 0.2s;

    &:hover,
    &:focus {background-color: var(--grayscale-100);}
    & > img {
        width: 24px;
        height: 24px;
    }
`;
