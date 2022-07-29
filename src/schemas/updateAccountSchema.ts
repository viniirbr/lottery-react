import * as yup from 'yup'

const updateAccountSchema = yup.object({
    name: yup.string().required("Campo obrigatório."),
    email: yup.string().email("Formato inválido de email. Certifique-se de usar '@' e '.'")
        .required("Campo obrigatório."),
});

export default updateAccountSchema;