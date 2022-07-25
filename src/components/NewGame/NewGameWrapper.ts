import styled from "styled-components";

const NewGameWrapper = styled.main`
    
    & > section {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 40px 20px;
    }

    & > section > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    & > section > div > div {
        display: flex;
        justify-content: flex-start;
        gap: 20px;
    }

    & > section > div:last-child {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

    @media screen and (min-width: 700px) {

        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 40px 50px 20px 50px;
        
        & > section {
            width: 60%;
        }

        & > aside {
            width: 60%;
            position: relative;
            top: 30px;
            max-width: 300px;
            border-radius: 10px;
        }

    }

    @media screen and (min-width: 1000px) {
        padding: 40px 130px 20px 130px;

        & section section div {
            width: 100%;
        }

    }

    @media screen and (min-width: 1200px){

        & > section > div > button:nth-child(2) {
            position: relative;
            right: 15%;
        }
    }
`

export default NewGameWrapper;