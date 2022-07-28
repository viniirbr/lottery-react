import * as yup from 'yup'

const changePasswordSchema = yup.object({
    password: yup.string().min(4, "A senha deve ter no mínimo 4 dígitos.")
        .required("Campo obrigatório."),
    confirmPassword: yup.string().required("Campo obrigatório.")
        .oneOf([yup.ref('password'), null], 'As senhas não coincidem.')
});

export default changePasswordSchema;