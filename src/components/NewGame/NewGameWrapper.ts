import styled from "styled-components";

const NewGameWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 40px 20px;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    & > div > div {
        display: flex;
        justify-content: space-between;
    }


    @media screen and (min-width: 700px) {
        padding: 40px 130px 20px 130px;
    }
`

export default NewGameWrapper;