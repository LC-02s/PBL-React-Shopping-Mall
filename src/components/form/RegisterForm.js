import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
    FormContainer, 
    FormEl, 
    FormTitle, 
    FormFieldset, 
    FormErrorMessage, 
    FormInfoTxt, 
    FormConfirmList, 
    FormConfirmItem,
    FormBtn,
} from './Form.style'
import spinnerPulse from '../../assets/spinner-pulse.svg'
import infoIcon from '../../assets/info.svg'
import { signUpEmail } from '../../auth'


export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const nameRegex = /[^ㄱ-ㅎㅏ-ㅣ\uAC00-\uD7A3a-z0-9]/i;
const pwRegex = { 
    lowerCase: { type: false, regex: /[a-z]+/, message: '비밀번호는 최소 1글자 이상의 소문자를 포함하여야 합니다' }, 
    upperCase: { type: false, regex: /[A-Z]+/, message: '비밀번호는 최소 1글자 이상의 대문자를 포함하여야 합니다' }, 
    number: { type: false, regex: /\d{2,}/, message: '비밀번호는 최소 2글자 이상의 연속된 숫자를 포함하여야 합니다' }, 
    symbol: { type: false, regex: /[!@#$%^&*]+/, message: '비밀번호는 최소 1글자 이상의 특수문자를 포함하여야 합니다' }, 
    space: { type: true, regex: /\s+/, message: '비밀번호는 공백문자를 포함할 수 없습니다' }, 
};
const passwordTest = (value) => {
    for (const type in pwRegex) {
        if (pwRegex[type].regex.test(value) === pwRegex[type].type) return pwRegex[type];
    }
}

export default function RegisterForm() {
    
    const { register, watch, formState: { errors }, setError, handleSubmit } = useForm({ mode: 'onSubmit' });
    const pwInputEl = watch('password');
    const confirmInputEl = watch('confirmPassword');
    // error : too-many re-render
    // (function(pw, cpw) {
    //     if (pw && cpw && pw === cpw) clearErrors('confirmPassword');
    // })(pwInputEl, confirmInputEl);

    const [ loadingSubmit, setLoadingSubmit ] = useState(false);

    const handleSubmitEvent = async ({ email, name, password }, e) => {
        // 유효성 검사 진행 후 실행됨
        setLoadingSubmit(true);
        const result = await signUpEmail(email, name, password);
        if (!result) setError('email', { type: 'alreadyUsedEmail', message: '이미 사용 중인 이메일 입니다' });
        setLoadingSubmit(false);
    }

    return (
        <FormContainer>
            <FormEl onSubmit={handleSubmit(handleSubmitEvent)}>
                <FormTitle>Register</FormTitle>
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
                <FormFieldset $error={errors.name ? true : false}>
                    <label htmlFor='name'>이름</label>
                    <input 
                        type='text' 
                        name='text' 
                        placeholder='이름을 입력해주세요'
                        autoComplete='off'
                        {...register('name', { 
                            required: '이름을 입력해주세요', 
                            minLength: { value: 2, message: '이름은 최소 2글자 이상 입력해야합니다', }, 
                            maxLength: { value: 20, message: '이름은 20글자 이상 입력할 수 없습니다', }, 
                            validate: {
                                match1: (value) => !(/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(value)) || '제대로 입력해주세요',
                                match2: (value) => !nameRegex.test(value) || '특수문자는 이름에 포함할 수 없습니다',
                            }
                        })}
                    />
                    { errors.name && 
                        <FormErrorMessage>{ errors.name?.message }</FormErrorMessage>
                    }
                </FormFieldset>
                <FormFieldset $error={errors.password ? true : false}>
                    <label htmlFor='password'>비밀번호</label>
                    <input 
                        type='password' 
                        name='password'
                        placeholder='사용할 비밀번호를 입력해주세요' 
                        autoComplete='off'
                        {...register('password', { 
                            required: '사용할 비밀번호를 입력해주세요', 
                            minLength: { value: 6, message: '비밀번호는 6글자 이상의 문자로 구성되어야 합니다', },
                            validate: { validation: (value) => passwordTest(value)?.message }
                        })}
                    />
                    { errors.password && 
                        <FormErrorMessage>{ errors.password?.message }</FormErrorMessage>
                    }
                    <FormInfoTxt>
                        <img src={infoIcon} alt='info icon' />
                        <span>비밀번호를 생성할 때는 다음의 조건을 충족해야 합니다</span>
                    </FormInfoTxt>
                    <FormConfirmList>
                        <FormConfirmItem $confirmed={pwInputEl && pwInputEl.length !== 0 && pwRegex.lowerCase.regex.test(pwInputEl)}>
                            최소 1글자의 소문자 포함 (a...z)</FormConfirmItem>
                        <FormConfirmItem $confirmed={pwInputEl && pwRegex.upperCase.regex.test(pwInputEl)}>
                            최소 1글자의 대문자 포함 (A...Z)</FormConfirmItem>
                        <FormConfirmItem $confirmed={pwInputEl && pwRegex.number.regex.test(pwInputEl)}>
                            최소 2글자의 연속된 숫자 포함 (0...9)</FormConfirmItem>
                        <FormConfirmItem $confirmed={pwInputEl && pwRegex.symbol.regex.test(pwInputEl)}>
                            최소 1글자의 특수문자 포함 (!@#$%^&* 중)</FormConfirmItem>
                    </FormConfirmList>
                </FormFieldset>
                <FormFieldset $error={(errors.confirmPassword ? true : false) || (pwInputEl && confirmInputEl && pwInputEl !== confirmInputEl)}>
                    <label htmlFor='confirmPassword'>비밀번호 확인</label>
                    <input 
                        type='password' 
                        name='confirmPassword' 
                        placeholder='입력한 비밀번호를 한번 더 입력해주세요'
                        autoComplete='off'
                        {...register('confirmPassword', { 
                            required: '비밀번호를 확인해주세요', 
                            validate: { match: (value) => value && pwInputEl !== value ? '비밀번호가 일치하지 않습니다' : undefined, }
                        })}
                    />
                    { 
                        (errors.confirmPassword && <FormErrorMessage>{ errors.confirmPassword?.message }</FormErrorMessage>) || 
                        (errors.confirmPassword ? true : false) || (
                        (pwInputEl && confirmInputEl && pwInputEl !== confirmInputEl) &&
                        <FormErrorMessage>비밀번호가 일치하지 않습니다</FormErrorMessage>)
                    }
                </FormFieldset>
                <FormBtn type='submit' disabled={loadingSubmit}>
                    { loadingSubmit ? <img src={spinnerPulse} alt='loading...' /> : '회원가입' }
                </FormBtn>
            </FormEl>
        </FormContainer>
    )
}
