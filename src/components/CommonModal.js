import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components'
import { modalOff } from '../context/actions/modal';

export default function CommonModal() {

    const { 
        isVisible, Component, interaction, useDimmedClick, useCloseBtn 
    } = useSelector(({ modal }) => modal);

    const dispatch = useDispatch();

    return (
        <ModalContainer $active={isVisible} $type={interaction ?? ''}>
            <ModalBox>
                { 
                useCloseBtn && 
                    <button type='button' onClick={() => dispatch(modalOff())}>
                        <span className='material-icons'>close</span>
                    </button>
                }
                { Component && <Component /> }
            </ModalBox>
            <DimmedEl onClick={() => useDimmedClick && dispatch(modalOff())}></DimmedEl>
        </ModalContainer>
    )
}

// styled components
const ModalBox = styled.div``;
const DimmedEl = styled.div``;

const ModalContainer = styled.div`
    position: fixed;
    z-index: 99999;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: inline-block;
    overflow: hidden;
    pointer-events: ${({ $active }) => $active ? 'all' : 'none'};

    & > ${ DimmedEl } {
        position: absolute;
        z-index: 1;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: inline-block;
        background-color: rgba(0,20,40,0.3);
        backdrop-filter: blur(2px);
        opacity: ${({ $active }) => $active ? 1 : 0};
        transition: opacity 0.3s;
    }

    & > ${ ModalBox } {
        position: relative;
        z-index: 9;
        display: inline-flex;
        flex-flow: row nowrap;

        ${({ $type }) => $type === 'center' && css`
            justify-content: center;
            align-items: center;
            transform: translateY(30%);
        `}

        ${({ $type }) => $type === 'right' && css`
            justify-content: flex-end;
            align-items: stretch;
            opacity: 1;
            transform: translateX(100%);
        `}

        opacity: ${({ $active }) => $active ? 1 : 0};
        transform: translateX(${({ $type }) => $type === 'right' ? '0.5s' : '0.3s'}) translateY(0%);
        transition: transfrom 0.3s, opacity 0.3s;
        transition-delay: 0.2s !important;
    }
`;
