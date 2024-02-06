import React from 'react';
import styled from 'styled-components';

const Star = () => {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 14">
            <path fill='#d8dfe3' fillRule="evenodd" d="M7 .277a1.04 1.04 0 0 0-.94.596L4.472 4.078a.495.495 0 0 0-.012.023a.486.486 0 0 0-.023.004L.94 4.623a1.04 1.04 0 0 0-.617 1.788l2.56 2.469l.006.005a.03.03 0 0 1 .009.027v.004l-.61 3.568v.001a1.05 1.05 0 0 0 1.526 1.107l3.15-1.665a.09.09 0 0 1 .072 0l3.15 1.664a1.049 1.049 0 0 0 1.527-1.106l-.61-3.57v-.003c-.002-.004-.001-.01 0-.014a.03.03 0 0 1 .008-.013l.006-.005l2.559-2.47a1.04 1.04 0 0 0-.617-1.787l-3.496-.518a.486.486 0 0 0-.023-.004a.495.495 0 0 0-.012-.023L7.94.873A1.04 1.04 0 0 0 7 .277" clipRule="evenodd"></path>
        </svg>
    );
}

export default function RatingStar({ persentage }) {
  return (
    <StarContainer $persentage={100 - Number(persentage)}>
        <span></span>
        <Star /><Star /><Star /><Star /><Star />
    </StarContainer>
  )
}

// styled componets
const StarContainer = styled.p`
    position: relative;
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    height: auto;
    font-size: 16px;
    
    & > span {
        position: absolute;
        top: 1px;
        bottom: 1px;
        left: 0px;
        right: ${({ $persentage }) => $persentage}%;
        display: inline-block;
        background-repeat: repeat-x;
        background-size: auto 100%;
        background-position: left top;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 14'%3E%3Cpath fill='%23ffab01' fill-rule='evenodd' d='M7 .277a1.04 1.04 0 0 0-.94.596L4.472 4.078a.495.495 0 0 0-.012.023a.486.486 0 0 0-.023.004L.94 4.623a1.04 1.04 0 0 0-.617 1.788l2.56 2.469l.006.005a.03.03 0 0 1 .009.027v.004l-.61 3.568v.001a1.05 1.05 0 0 0 1.526 1.107l3.15-1.665a.09.09 0 0 1 .072 0l3.15 1.664a1.049 1.049 0 0 0 1.527-1.106l-.61-3.57v-.003c-.002-.004-.001-.01 0-.014a.03.03 0 0 1 .008-.013l.006-.005l2.559-2.47a1.04 1.04 0 0 0-.617-1.787l-3.496-.518a.486.486 0 0 0-.023-.004a.495.495 0 0 0-.012-.023L7.94.873A1.04 1.04 0 0 0 7 .277' clip-rule='evenodd'/%3E%3C/svg%3E");
    }
`;

