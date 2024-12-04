import Logo from './Logo';

const OTP = () => {

    const signupBtn = ()=>{
        window.location.href = "/signup"
    }

    const forgetPassword = ()=>{
        window.location.href = "/forgetpassword"
    }

    return (
        <>  
            <Logo />
            <div id="home-background">
                <div id="home-container">
                    <div id='signin-form'>
                        <form>
                            <h2>OTP Code</h2>
                            <p id="otp-caption">An OTP code has been sent to your sign up email. Please enter it below.</p>
                            <label htmlFor='otp-code'>Code</label>
                            <input type='text' id="otpCode" placeholder='OTP-Code'></input>
                            <input type='submit' value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OTP;