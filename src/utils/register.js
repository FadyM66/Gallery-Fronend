const register = async (values) => {

    let url = 'http://localhost:8000/auth/register'
    const formData = new FormData();

    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.passwd);

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })

    const data = await response.json();

    if (response.status === 200){
        const token = data.token
        return token
    }

    if (response.status === 400 && data.message == "User already exists."){
        return {"status": data.message}
    }

    if (response.status === 500){
        return false
    }

}

export default register;