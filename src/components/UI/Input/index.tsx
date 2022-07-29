import { FC, InputHTMLAttributes, useState } from "react"
import { CSSProperties } from "styled-components"
import InputWrapper from "./styles"
import { PencilSimple, Check } from 'phosphor-react'

interface Props {
    label: string,
    inputAttributes: InputHTMLAttributes<HTMLInputElement>
    styles?: CSSProperties,
    hasEditing?: boolean
}

const Input: FC<Props> = ({ label, inputAttributes, styles, hasEditing }) => {

    const [isEditing, setIsEditing] = useState<boolean>(hasEditing ? false : true);

    function toogleEdit() {
        setIsEditing(prev => !prev);
    }

    return (
        <InputWrapper styles={styles} isEditing={isEditing} hasEditing={hasEditing}>
            <label htmlFor={inputAttributes.id}>{label}</label>
            <div>
                <input {...inputAttributes} readOnly={!isEditing}/>
                {hasEditing && !isEditing && <PencilSimple onClick={toogleEdit} size={32}/>}
                {hasEditing && isEditing && <Check onClick={toogleEdit} size={32} color='#B5C401'/>}
            </div>
        </InputWrapper>
    )
}

export default Input