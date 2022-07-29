import { useEffect, useState } from "react"
import AccountInfoWrapper from "./styles"
import { user } from 'shared/services'
import { useAppSelector } from "store/hooks";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import updateAccountSchema from "schemas/updateAccountSchema";
import { Input } from "..";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

interface FormData {
    name: string,
    email: string
}

function AccountInfo() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { getUserAccount, updateUser } = user();
    const token = useAppSelector(state => state.auth.token);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: yupResolver(updateAccountSchema)
    });
    const navigate = useNavigate();

    useEffect(() => {

        getAccountInfo();

        async function getAccountInfo() {
            try {
                setIsLoading(true);
                const response = await getUserAccount({ "Authorization": `Bearer ${token?.token as string}` });
                setValue('name', response.name);
                setValue('email', response.email);
            } catch (error: any) {

            } finally {
                setIsLoading(false);
            }
        }
    }, []);

    async function handleUpdateAccount(data: FormData) {
        try {
            setIsLoading(true);
            const { name, email } = data;
            await updateUser({ name: name, email: email }, token?.token as string);
            toast.success("Informações atualizadas com sucesso!")
            navigate('/');
            
        } catch(e: any) {
            toast.error("Ocorreu um erro inesperado");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AccountInfoWrapper
            className=""
            title="Informações da conta"
            exitRoute="/"
            exitButtonTitle="Página inicial"
            submitButtonTitle="Salvar"
            isLoading={isLoading}
            handleSubmit={handleSubmit(async (data) => handleUpdateAccount(data))}>

            <h2>Nome</h2>
            <Controller
                control={control}
                name='name'
                defaultValue=""
                render={({ field: { value, onChange, onBlur } }) =>
                    <Input
                        label="Name"
                        hasEditing={true}
                        inputAttributes={{
                            type: 'text', id: 'name', placeholder: 'Name',
                            value: value, onChange: onChange, onBlur: onBlur
                        }} />} />
            <p>{errors.name?.message}</p>

            <h2>Email</h2>
            <Controller
                control={control}
                name='email'
                defaultValue=""
                render={({ field: { value, onChange, onBlur } }) =>
                    <Input
                        label="Email"
                        hasEditing={true}
                        inputAttributes={{
                            type: 'email', id: 'email', placeholder: 'Email',
                            value: value, onChange: onChange, onBlur: onBlur
                        }} />} />
            <p>{errors.email?.message}</p>


        </AccountInfoWrapper>
    )
}

export default AccountInfo