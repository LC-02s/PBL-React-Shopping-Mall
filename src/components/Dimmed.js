import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Dimmed({ Component }) {

    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        setIsActive(true);
        return setIsActive(false);
    }, []);

    return (
        <DimmedContainer>
            {/* <Component /> */}
            <DimmedEl $active={isActive}></DimmedEl>
        </DimmedContainer>
    )
}

const DimmedContainer = styled.section`
    position: fixed;
    z-index: 9999;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: inline-block;
    overflow: hidden;

    & > *:not() {
        transition-delay: 0.2s !important;
    }
`;

const DimmedEl = styled.section`
    position: fixed;
    z-index: 9999;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: inline-block;
    overflow: hidden;
    background-color: rgba(0,20,40,0.3);
    backdrop-filter: blur(2px);
    opacity: ${({ $active }) => $active ? 1 : 0};
    transition: opacity 0.3s;

    & > * {
        transition-delay: 0.2s !important;
    }
`;
