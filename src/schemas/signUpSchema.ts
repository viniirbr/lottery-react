import * as yup from 'yup'

const signUpSchema = yup.object({
    name: yup.string().required("Campo obrigatório."),
    email: yup.string().email("Formato inválido de email. Certifique-se de usar '@' e '.'")
        .required("Campo obrigatório."),
    password: yup.string().min(4, "A senha deve ter no mínimo 4 dígitos.")
        .required("Campo obrigatório.")
})

export default signUpSchema;