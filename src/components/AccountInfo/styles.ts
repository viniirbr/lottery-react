import styled from "styled-components";
import { Form } from "..";

const AccountInfoWrapper = styled(Form)`
    padding: 45px 30px;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 35px 10px;
        height: 315px;
    }

    & > div > h2 {
        margin-left: 10px;
    }

    @media screen and (min-width: 700px) {
        width: 50%;
        margin: 0 auto;
    }
`

export default AccountInfoWrapper;