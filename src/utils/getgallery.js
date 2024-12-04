import Cookies from 'js-cookie';

const getImages = async () => {

    const url = 'http://localhost:8000/images/'
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'token' : Cookies.get('token')
            }
        })

        const data = await response.json();
        
        if (response.status == 200) {
            let result = {
                'count': data.count,
                'images': data.results
            }
            return result
        }

        if (response.status == 401) {
            return 401
        }

        if (response.status == 500) {
            return false
        }
    }
    catch {
        return false
    }
}

export default getImages;