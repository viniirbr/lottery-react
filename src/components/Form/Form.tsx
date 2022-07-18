import Card from "components/UI/Card/Card"
import { FC, FormEvent, ReactNode } from "react"
import FormWrapper from "./FormWrapper"
import { Link } from 'react-router-dom'

interface Props {
    children: ReactNode,
    title: string,
    submitButtonTitle: string,
    exitButtonTitle: string,
    exitRoute: string,
    className: string,
    handleSubmit: (event: FormEvent) => void
}

const Form: FC<Props> = ({ title, children, submitButtonTitle, exitButtonTitle, exitRoute, className,
    handleSubmit }) => {

    return (
        <FormWrapper className={className} onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <Card hasShadow={true} styles={{ width: '100%', margin: '20px 0' }}>
                {children}
                <button type='submit'>{submitButtonTitle}</button>
            </Card>
            <h2><Link to={exitRoute}>{exitButtonTitle}</Link></h2>
        </FormWrapper>
    )
}

export default Form