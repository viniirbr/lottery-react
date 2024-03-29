import styled from "styled-components";

const HeaderWrapper = styled.header`

display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 60px;
padding: 20px 30px;
box-sizing: border-box;
border-bottom: 2px solid #EBEBEB;

& nav {
    width: 100%;
}

& nav, ul {
    display: flex;
    align-items: center;
}

& nav {
    justify-content: space-between;
}

& nav ul li h1 {
    font-size: 2rem;
    border-bottom: 5px solid #B5C401;
    padding-bottom: 10px;
    position: relative;
    top: 9px;
    border-radius: 4px;
}

& nav ul li {
    cursor: pointer;
}

& nav ul li {
    margin-right: 10px;
}

@media screen and (min-width: 700px) {
        padding: 20px 130px;
        & nav ul {
            gap: 30px;
        }

        & nav ul li h1{
            font-size: 2.3rem;
            font-weight: 700;
            padding-right: 5px;
            padding-left: 5px;
        }

        & nav ul li h2 {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 1.3rem;
        }
}


`
export default HeaderWrapper;