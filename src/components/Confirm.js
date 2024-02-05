import React from 'react'
import { FormEl } from './RegisterForm'
import { CommonBtnMD } from '../styles/styledModules'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { modalOff } from '../context/actions/modal';

export default function Confirm({ confirmType, title, content }) {

    const dispatch = useDispatch();

    const handleSubmit = () => {}

    return (
        <FormEl onSubmit={handleSubmit}>
            <ConfirmContainer $type={confirmType || false}>
                <ConfirmTitle>{ title || 'confirm title' }</ConfirmTitle>
                <ConfirmContentTxt>
                    { content || 'this is confirm content area' }
                </ConfirmContentTxt>
            </ConfirmContainer>
            <ConfirmBtnWrap>
                <CommonBtnMD onClick={() => dispatch(modalOff())}>
                    취소하기
                </CommonBtnMD>
                <CommonBtnMD $primary={true}></CommonBtnMD>
            </ConfirmBtnWrap>
        </FormEl>
    )
}

const ConfirmContainer = styled.h2`

`;

const ConfirmTitle = styled.h2`

`;

const ConfirmContentTxt = styled.p`

`;

const ConfirmBtnWrap = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    width: auto;
`;