import Cookies from 'js-cookie';

const signin = async (values) => {

    const url = 'http://localhost:8000/auth/login'
    const formData = new FormData();

    formData.append('email', values.email);
    formData.append('password', values.password);
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })

        const data = await response.json();

        if (response.status == 200) {
            const token = data.token
            Cookies.set('token', token, { expires: 30, secure: true })
            return true
        }

        if (response.status == 401 || response.status == 404) {
            return { "status": data.message }
        }

        if (response.status === 500) {
            return false
        }
    }
    catch {
        return false
    }
}

export default signin;