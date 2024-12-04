import * as yup from 'yup';

export const signinSchema = yup.object({
    email: yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: yup.string().min(1)
        .required('Required'),
})