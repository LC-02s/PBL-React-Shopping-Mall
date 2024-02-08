import React, { useEffect, useState } from 'react'
import {
    FormEl,
    FormTitle,
    FormFieldset,
    FormBtn,
    FormErrorMessage,
    FormRegisterLink
} from './Form.style'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { modalOff } from '../../context/actions/modal'
import closeIcon from '../../assets/close.svg'
import spinnerPulse from '../../assets/spinner-pulse.svg'
import { emailRegex, passwordTest } from './RegisterForm'
import { useForm } from 'react-hook-form'
import { ModalCloseBtn } from '../CommonModal'
import { signInEmail } from '../../auth'
import { setUserData } from '../../context/actions/user'

export default function LoginForm({ useToModal }) {
    
    const { isVisible } = useSelector(({ modal }) => modal);
    const dispatch = useDispatch();
    const { register, formState: { errors }, setError, reset, handleSubmit } = useForm({ mode: 'onSubmit' });
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [ loadingSubmit, setLoadingSubmit ] = useState(false);

    useEffect(() => { if (!isVisible) reset(); }, [isVisible, reset]);
    
    const handleSubmitEvent = async ({ email, password }, e) => {
        e.preventDefault();

        // 유효성 검사 진행 후 실행됨
        setLoadingSubmit(true);

        const result = await signInEmail(email, password);
        if (!result.status && result.errCode === 'invaild-email') setError('email', { 
            type: 'alreadyUsedEmail', message: '유효하지 않은 이메일 입니다' });

        setLoadingSubmit(false);
        
        if (result.status) {
            const {uid, displayName, email, photoURL, accessToken } = result.userData
            dispatch(modalOff());
            dispatch(setUserData({ uid, displayName, email, photoURL, accessToken }));
            navigate(pathname !== '/register' ? `${pathname}` : '/');
        }
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
                        required: '이메일을 입력해주세요', 
                        pattern: { value: emailRegex, message: '유효하지 않은 이메일입니다', }, 
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
                        required: '비밀번호를 입력해주세요', 
                        minLength: { value: 6, message: '비밀번호가 일치하지 않습니다', },
                        validate: { validation: (value) => passwordTest(value) ? '비밀번호가 일치하지 않습니다' : undefined }
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