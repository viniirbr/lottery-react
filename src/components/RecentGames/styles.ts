import styled from "styled-components";

const RecentGamesWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 100%;
    padding: 40px 20px;
    box-sizing: border-box;

    & header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 80px;
        width: 100%;
    }

    & a {
        color: #B5C401;
    }

    & > header > div > div {
        display: flex;
        flex-direction: column;
    }

    & > header > div > div > div {
        display: flex;
        justify-content: space-between;
    }

    & header div p {
        margin: 10px 10px 10px 0;
    }

    & header div button {
        margin-right: 10px;
        }

    @media screen and (min-width: 500px) {

        & header {
            flex-direction: row;
            align-items: center;
            gap: 20px;
        }

        & > header > div {
            gap: 30px;
        }

        & header h3 {
            display: flex;
            align-items: center;
            color: #B5C401;
            cursor: pointer;
        }

        & header div {
            display: flex;
            align-items: center;
        }

        & > header > div > div {
        display: flex;
        flex-direction: row;
    }
    }

    @media screen and (min-width: 700px) {
        padding: 40px 130px 20px 130px;

        & > p {
            font-size: 1.5rem;
            text-align: center;
            position: relative;
            top: calc(100vh/4);
        }

        & header div h2,a {
            font-size: 1.5rem;
        }
    }
`

export default RecentGamesWrapper;