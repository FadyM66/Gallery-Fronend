import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const signupSchema = yup.object().shape({
    username: yup.string().min(4).max(14).required("Required"),
    email: yup.string().email('Please enter a valid email').required("Required"),
    password: yup.string()
        .min(8)
        .matches(passwordRules, { message: "Please enter a Strong password" })
        .required("Required"),
    confirmpassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password doesn\'t match')
        .required("Required")
});