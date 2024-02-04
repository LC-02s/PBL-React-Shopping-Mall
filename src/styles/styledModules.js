import styled from "styled-components";

export const CommonWrapper = styled.div`
    position: relative;
    display: block;
    width: 100%;
    max-width: 1280px;
    height: auto;
    margin: 0px auto;
    padding: 0px 40px;

    @media (max-width: 1200px) {
        padding: 0px 30px;
    }
    @media (max-width: 1024px) {
        padding: 0px 24px;
    }
    @media (max-width: 768px) {
        padding: 0px 20px;
    }
`;

export const Contents = styled.section`
    position: relative;
    display: block;
    width: 100%;
    max-width: 1280px;
    height: auto;
    min-height: calc(200vh - 160px);
    margin: 0px auto;
    padding: 120px 40px 200px;

    @media (max-width: 1200px) {
        padding: 100px 30px 180px;
    }
    @media (max-width: 1024px) {
        padding: 100px 24px 160px;
    }
    @media (max-width: 768px) {
        padding: 80px 20px 140px;
    }
`;