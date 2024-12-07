import { useNavigate } from 'react-router-dom';
import { signinSchema } from "../assets/Schema/singin";
import { useFormik } from "formik";
import { useEffect } from 'react';
import fetcher from '../utils/fetcher';
import Logo from "../components/Logo";
import Cookies from 'js-cookie';

const Singin = () => {

    const Nav = useNavigate();
    
    useEffect(() => {
        if (Cookies.get('token') && window.location.pathname != '/my-gallery') {
          window.location.href = "/my-gallery";
        }
      }, []);

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
            email: "",
            password: "",
        },
        validationSchema: signinSchema,
        onSubmit: async (values) => {
            const {response, data} = await fetcher(
                'https://tfhmptlcmi.execute-api.eu-north-1.amazonaws.com/production/auth/login',
                "POST",
                values
            )
            if (response.status == 200) {
                Cookies.set("token", data.token)
                Nav('/my-gallery')
            }
            else if (response.status == 401) {
                setFieldError('password', "Invalid password")
            }
            else if (response.status == 404){
                setFieldError('email', "User is not registered")
            }
            else {
                setFieldError('password', "something went wrong")
            }
        },
    });

    const signupBtn = () => {
        Nav("/signup")
    }

    return (
        <>
            <Logo />
            <div id='signin-form'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign in</h2>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        placeholder='Email'
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.email && errors.email ? <div className="error">{errors.email}</div> : null}

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? <div className="error">{errors.password}</div> : null}

                    {/* <p id='forgetpassword' onClick={forgetPassword}>forget password ?</p> */}
                    <input type='submit' value="Sign in" />
                    <p id="signup-option">Not a member ? <span onClick={signupBtn}>Sign up</span> </p>
                </form>
            </div>
        </>
    )
}

export default Singin;
