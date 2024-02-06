import React, { useEffect, useState } from 'react'
import {
    FormEl,
    FormTitle,
    FormFieldset,
    FormBtn,
    FormErrorMessage
} from './RegisterForm'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { modalOff } from '../../context/actions/modal'
import closeIcon from '../../assets/close.svg'
import spinnerPulse from '../../assets/spinner-pulse.svg'
import { emailRegex } from './RegisterForm'
import { useForm } from 'react-hook-form'
import { ModalCloseBtn } from '../CommonModal'

export default function LoginForm({ useToModal }) {
    
    const { isVisible } = useSelector(({ modal }) => modal);
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { register, formState: { errors }, setError, reset, handleSubmit } = useForm({ mode: 'onSubmit' });

    const [ loadingSubmit, setLoadingSubmit ] = useState(false);

    useEffect(() => { if (!isVisible) reset(); }, [isVisible, reset]);
    

    const handleSubmitEvent = async ({ email, password }, e) => {
        // 유효성 검사 진행 후 실행됨
        setLoadingSubmit(true);
        // const result = await signUpEmail(email, name, password);
        // if (!result) setError('email', { type: 'alreadyUsedEmail', message: '이미 사용 중인 이메일 입니다' });
        setLoadingSubmit(false);
    }

    return (
        <FormEl onSubmit={handleSubmit(handleSubmitEvent)} style={{ position: 'relative' }}>
            <FormTitle>Login</FormTitle>
            {
            useToModal &&
                <ModalCloseBtn onClick={() => dispatch(modalOff())}>
                    <img src={closeIcon} alt='close' />
                </ModalCloseBtn>
            }
            <FormFieldset $error={errors.email ? true : false}>
                    <label htmlFor='email'>이메일</label>
                    <input 
                        type='email' 
                        name='email' 
                        placeholder='이메일을 입력해주세요'
                        autoComplete='off'
                        {...register('email', { 
                            requied: '이메일을 입력해주세요', 
                            pattern: { value: emailRegex, message: '유효하지 않은 이메일입니다', }, 
                            validate: { empty: (value) => value ? undefined : '이메일을 입력해주세요' },
                        })}
                    />
                    { errors.email && 
                        <FormErrorMessage>{ errors.email?.message }</FormErrorMessage>
                    }
                </FormFieldset>
            <FormFieldset $error={errors.password ? true : false}>
                <label htmlFor='password'>비밀번호</label>
                <input 
                    type='password' 
                    name='password' 
                    placeholder='비밀번호를 입력해주세요'
                    autoComplete='off' 
                    {...register('password', { 
                        requied: '비밀번호를 입력해주세요', 
                        validate: { empty: (value) => value ? undefined : '비밀번호를 입력해주세요' },
                    })}
                />
                { errors.password && 
                    <FormErrorMessage>{ errors.password?.message }</FormErrorMessage>
                }
            </FormFieldset>
            <FormBtn type='submit' disabled={loadingSubmit}>
                { loadingSubmit ? <img src={spinnerPulse} alt='loading...' /> : '로그인' }
            </FormBtn>
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
