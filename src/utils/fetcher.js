import Cookies from 'js-cookie';
import log from 'loglevel';

const fetcher = async (url, Method, values = {}, register = false) => {
    let body = null;
    let token = null;

    log.debug(`Log..Fetching URL: ${url} with method: ${Method}`); 

    if (Object.keys(values).length > 0) {
        body = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            body.append(key, value);
        });
        log.debug(`Log..Request body: ${JSON.stringify(values)}`); 
    }

    if (!register) {
        token = Cookies.get('token');
        log.debug('Log..Using token for authentication');
    } else {
        token = Cookies.get('registerToken');
        log.debug('Log..Using register token for authentication');
    }

    try {
        const response = await fetch(url, {
            method: Method,
            headers: {
                "token": token || null
            },
            body: body
        });

        const data = await response.json();
        log.info('Log..Request successful', { status: response.status, data });
        return { response, data };
    } catch (error) {
        log.error('Log..Request failed', error);
        return { response: null, data: null };
    }
}

export default fetcher;
