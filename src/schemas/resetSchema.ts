import * as yup from 'yup'

const resetSchema = yup.object({
    email: yup.string().email("Formato inválido de email. Certifique-se de usar '@' e '.'")
        .required("Campo obrigatório.")
})

export default resetSchema;