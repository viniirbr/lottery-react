import { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
    hideCartModal: (show: boolean) => void
}

export const Backdrop: FC<Props> = ({ hideCartModal }) => {
    return <BackdropWrapper onClick={() => hideCartModal(false)}/>
}

const BackdropWrapper = styled.div`

position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
overflow: hidden;
z-index: 10;
background: rgba(0, 0, 0, 0.75);
`

export const Modal: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ModalWrapper>
            {children}
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    overflow: hidden;
    background: white;
    border-radius: 10px;
`