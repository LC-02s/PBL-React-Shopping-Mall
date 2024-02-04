import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

export default function RegisterForm() {

    const { register, watch, formState: { errors }, handleSubmit } = useForm();

    const handleSubmitEvent = async ({ email, name, password }) => {
        console.log(email, name, password);
    }

    return (
        <FormContainer>
            <FormEl onSubmit={(e) => {e.preventDefault(); handleSubmit(handleSubmitEvent)}}>
                <FormTitle>Register</FormTitle>
                <FormFieldset $type={errors.email ? 'error' : false}>
                    <label>Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        {...register('email', { requied: true, pattern: /^\S+@\S+$/i })}
                    />
                    {
                    errors.email?.type === 'requied' ? 
                        <p>이메일을 입력해주세요</p> : 
                    errors.email?.type === 'pattern' ? 
                        <p>유효하지 않은 이메일입니다</p> : void(0)
                    }
                </FormFieldset>
                <FormFieldset $type={errors.name ? 'error' : false}>
                    <label>Name</label>
                    <input 
                        type='text' 
                        name='text' 
                        {...register('name', { requied: true, maxLength: 30 })}
                    />
                    {
                    errors.name?.type === 'requied' ? 
                        <p>이름을 입력해주세요</p> : 
                    errors.name?.type === 'maxLength' ? 
                        <p>이름은 30자를 넘을 수 없습니다</p> : void(0)
                    }
                </FormFieldset>
                <FormFieldset $type={errors.password ? 'error' : false}>
                    <label>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        {...register('password', { requied: true, maxLength: 30 })}
                    />
                    {
                    errors.password?.type === 'requied' ? 
                        <p>비밀번호를 입력해주세요</p> : 
                    errors.password?.type === 'maxLength' ? 
                        <p>비밀번호는 30자를 넘을 수 없습니다</p> : void(0)
                    }
                </FormFieldset>
                <FormBtn type='submit'>회원가입</FormBtn>
            </FormEl>
        </FormContainer>
    )
}

export const FormContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;
`;

export const FormEl = styled.form`
    display: block;
    width: 100%;
    max-width: 600px;
    padding: 32px 40px 40px;
    margin: 0px auto;
    border: 1px solid var(--grayscale-200);
    border-radius: 18px;
    background-color: var(--brand-white);

    @media (max-width: 768px) {max-width: 100%;}
`;

export const FormTitle = styled.h2`
    display: block;
    width: 100%;
    height: auto;
    margin: 0px 0px 24px;
    font-size: 20px;
    font-weight: 700;
    color: var(--grayscale-900);
    text-align: left;
`;

export const FormFieldset = styled.fieldset`
    display: block;
    width: 100%;
    height: auto;


    & + & {
        margin: 14px 0px 0px;
    }
    & > label {
        display: block;
        width: 100%;
        height: auto;
        padding: 0px 4px;
        margin: 0px 0px 4px;
        font-size: 15px;
        font-weight: 500;
        color: var(--grayscale-600);
    }
    & > input {
        display: block;
        width: 100%;
        height: 42px;
        padding: 8px 14px;
        border: 1px solid var(--grayscale-200);
        font-size: 16px;
        font-weight: 400;
        color: var(--grayscale-700);
        border-radius: 6px;
        background-color: var(--brand-white);
        outline: none;
        transition: border 0.2s, box-shadow 0.2s;
    }
    & > input:focus {
        border-color: #414143;
        box-shadow: 0px 0px 0px 2px rgba(65,65,67,0.3);
    }
`;

export const FormBtn = styled.button`
    display: block;
    width: 100%;
    height: auto;
    padding: 12px;
    margin: 48px 0px 0px;
    font-size: 18px;
    font-weight: 500;
    color: var(--brand-white);
    border-radius: 6px;
    background-color: #414143;
    transition: background 0.2s;

    &:hover {background-color: #FCB041;}
`;