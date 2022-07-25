import styled from "styled-components";

const InitialPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  text-align: center;
  padding: 30px 50px;
  box-sizing: border-box;
  
  & section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 130px;
  }
  
  & section h1,h2,h4 {
    font-weight: 700;
  }

  & section h1 {
    font-size: 3rem;
  }

  & section h2 {
    font-size: 2rem;
  }

  & section h4 {
    font-size: 1.3rem;
    background: #B5C401;
    border-radius: 100px;
    width: 50px;
    color: #FFFFFF;
    padding: 5px 20px;
  }


  @media screen and (min-width: 700px){
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 0;

    & section {
    width: 20%;
    height: 280px;
  }

  & section h1 {
    font-size: 3rem;
  }

  & section h2 {
    font-size: 2.7rem;
    word-spacing: 100px;
  }

    & form {
      width: 40%;
      max-width: 350px;
    }

  & section h1,h2,h4 {
    font-weight: 700;
  }

  & section h1 {
    font-size: 4rem;
  }
  }
`

export default InitialPageWrapper;