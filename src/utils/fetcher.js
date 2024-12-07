import Cookies from 'js-cookie';

const fetcher = async (url, Method, values={}, register=false) => {

    let body = null;
    let token = null;

    if (Object.keys(values).length > 0) {
        body = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            body.append(key, value);
        });
    }

    if (!register) {
        token = Cookies.get('token')
    }
    else if (register) {
        token = Cookies.get('registerToken')
    }
    
    try {
        const response = await fetch(url,
            {
                method: Method,
                headers: {
                    "token": token || null
                },
                body: body
            }
        )

        const data = await response.json()
        console.log("res: ", response)
        console.log("data: ", data)
        return { response, data }
    }
    catch {
        return { response: null, data: null }
    }

}

export default fetcher;