import * as yup from 'yup'

const resetSchema = yup.object({
    email: yup.string().email("Formato inválido de email. Certifique-se de usar '@' e '.'")
        .required("Campo obrigatório."),
        password: yup.string().min(4, "A senha deve ter no mínimo 4 dígitos.")
        .required("Campo obrigatório."),
        confirmPassword: yup.string().required()
        .oneOf([yup.ref('password'), null], 'As senhas não coincidem.')
})

export default resetSchema;