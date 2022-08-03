import * as yup from 'yup'

const changePasswordSchema = yup.object({
    password: yup.string().required("Campo obrigatório.")
        .min(4, "A senha deve ter no mínimo 4 dígitos."),
    confirmPassword: yup.string().required("Campo obrigatório.")
        .oneOf([yup.ref('password'), null], 'As senhas não coincidem.')
});

export default changePasswordSchema;