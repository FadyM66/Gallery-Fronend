import { useFormik } from "formik";
import { signupSchema } from "../assets/Schema/signup.js";
import { useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import ConfirmationPrompt from './ConfirmPrompt';
import { useState, useEffect } from 'react';
import fetcher from "../utils/fetcher.js";
import Cookies from 'js-cookie';

const Singup = () => {

    useEffect(() => {
        if (Cookies.get('token') && window.location.pathname != '/my-gallery') {
          window.location.href = "/my-gallery";
        }
      }, []);
      
    const Nav = useNavigate();

    const [message, setMessage] = useState("Enter the OTP sent to your email.")

    const [isPromptOpen, setPromptOpen] = useState(false)

    const handleConfirm = async (inputValue) => {
        const { response, data } = await fetcher(
            'http://localhost:8000/auth/verify-otp', 
            "POST",
            { "otp": inputValue },
            true
        );
        if (response.status === 201) {
            Nav('/signin');
        }
        if (data.message === "Invalid OTP") {
            setMessage("Wrong OTP");
        }
    };

    const handleCancel = () => {
        Nav('/')
    }
    
    const options = { "confirm": "Enter", "cancel": "cancel" }

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldError
    } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmpassword: ""
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            const {response, data} = await fetcher(
                'http://localhost:8000/auth/register',
                "POST",
                values,
                true
            )
            if (response.status == 200) {
                Cookies.set("registerToken", data.token)
                setPromptOpen(true)
            }
            else if (response.status == 409){
                setFieldError('email', "Email already used")
            }
            else {
                setFieldError('password', "something went wrong")
            }
        }
    });

    const signinBtn = () => {
        Nav('/signin')
    };

    return (
        <>
            <Logo />
            <div id='signup-form'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign up</h2>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id="username"
                        name="username"
                        placeholder='Username'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.username && errors.username && <div className="error">{errors.username}</div>}

                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.email && errors.email && <div className="error">{errors.email}</div>}

                    <label htmlFor='passwd'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name="password"
                        placeholder='Password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.password && errors.password && <div className="error">{errors.password}</div>}

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirmpassword'
                        name="confirmpassword"
                        placeholder='Confirm Password'
                        value={values.confirmpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.confirmpassword && errors.confirmpassword && <div className="error">{errors.confirmpassword}</div>}

                    <input type='submit' value="Sign up" />
                    <p id="signin-option">Already a member ? <span onClick={signinBtn}>Sign in</span> </p>
                </form>
            </div>

            <ConfirmationPrompt
                isOpen={isPromptOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message={message}
                options={options}
                showInput={true}
            />
        </>
    );
};

export default Singup;