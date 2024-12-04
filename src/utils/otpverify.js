const otpverify = async (value, token) => {

    let url = 'http://localhost:8000/auth/verify-otp'
    const formData = new FormData();

    formData.append('otp', value);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'token': token
        },
        body: formData
    })

    const data = await response.json();
    
    if (response.status === 201){
        return true
    }

    if (response.status === 401 && data.message == "Invalid otp"){
        return {"status": data.message}
    }

    if (response.status === 500){
        return false
    }

}

export default otpverify;