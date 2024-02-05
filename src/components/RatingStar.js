import React from 'react';
import styled from 'styled-components';

const Star = ({ hex }) => {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
            <path fill={hex ?? '#d8dfe3'} fillRule="evenodd" d="M7 .277a1.04 1.04 0 0 0-.94.596L4.472 4.078a.495.495 0 0 0-.012.023a.486.486 0 0 0-.023.004L.94 4.623a1.04 1.04 0 0 0-.617 1.788l2.56 2.469l.006.005a.03.03 0 0 1 .009.027v.004l-.61 3.568v.001a1.05 1.05 0 0 0 1.526 1.107l3.15-1.665a.09.09 0 0 1 .072 0l3.15 1.664a1.049 1.049 0 0 0 1.527-1.106l-.61-3.57v-.003c-.002-.004-.001-.01 0-.014a.03.03 0 0 1 .008-.013l.006-.005l2.559-2.47a1.04 1.04 0 0 0-.617-1.787l-3.496-.518a.486.486 0 0 0-.023-.004a.495.495 0 0 0-.012-.023L7.94.873A1.04 1.04 0 0 0 7 .277" clipRule="evenodd"></path>
        </svg>
    );
}

export default function RatingStar({  }) {
  return (
    <StarContainer>
        <StarWrapper>
            <Star hex='#ffab01' /><Star hex='#ffab01' /><Star hex='#ffab01' /><Star hex='#ffab01' /><Star hex='#ffab01' />
        </StarWrapper>
        <StarWrapper>
            <Star /><Star /><Star /><Star /><Star />
        </StarWrapper>
    </StarContainer>
  )
}

// styled componets
const StarWrapper = styled.span`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    width: auto;
    height: 32px;
    font-size: 32px;
`;

const StarContainer = styled.p`
    position: relative;
    display: inline-block;
    width: auto;
    height: auto;
`;

