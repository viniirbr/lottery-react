import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().email("Formato inválido de email. Certifique-se de usar '@' e '.'")
        .required("Campo obrigatório."),
    password: yup.string().required("Campo obrigatório.")
        .min(4, "A senha deve ter no mínimo 4 dígitos.")
})

export default schema;