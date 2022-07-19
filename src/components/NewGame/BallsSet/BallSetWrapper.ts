import styled from "styled-components";

const BallSetWrapper = styled.div`

display: grid;
grid-template-columns: repeat(auto-fill, 25%);
width: 100%;
padding: 20px;
box-sizing: border-box;

p {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
}

`

export default BallSetWrapper;