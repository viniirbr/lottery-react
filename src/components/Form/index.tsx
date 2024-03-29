import { Card } from "components"
import { FC, ReactNode } from "react"
import FormWrapper from "./styles"
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'phosphor-react'
import { BeatLoader } from 'react-spinners'

interface Props {
    children: ReactNode,
    title: string,
    submitButtonTitle: string,
    exitButtonTitle: string,
    exitRoute: string,
    className: string,
    isLoading: boolean,
    exitRouteFoward?: boolean
    handleSubmit: any
}

const Form: FC<Props> = ({ title, children, submitButtonTitle, exitButtonTitle, exitRoute, className,
    isLoading, exitRouteFoward, handleSubmit }) => {

    return (
        <FormWrapper className={className} onSubmit={handleSubmit} noValidate={true}>
            <h2 data-cy="form-title">{title}</h2>
            <Card hasShadow={true} styles={{ width: '100%', margin: '20px 0' }}>
                {children}
                <button type='submit' data-cy='submit' disabled={isLoading}>
                    {submitButtonTitle}{isLoading ? <BeatLoader color='#B5C401' size={15} />
                        : <ArrowRight color='#B5C401' size={32} />}
                </button>
            </Card>
            <h2><Link to={exitRoute}>
                {!exitRouteFoward && <ArrowLeft color='#707070' size={32} />}
                {exitButtonTitle}
                {exitRouteFoward && <ArrowRight color='#707070' size={32} />}
            </Link></h2>
        </FormWrapper>
    )
}

export default Form;