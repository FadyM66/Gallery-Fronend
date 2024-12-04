import Cookies from 'js-cookie';

const fetchImageData = async (image_id) => {
    const url = `http://localhost:8000/images/${image_id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'token': Cookies.get('token'),
            }
        });

        if (!response.status == 200) {
            return [response, null];
        }

        const data = await response.json();
        return [response, data]; 
    } catch (error) {
        console.error('Error fetching image data:', error);
        return [null, null];
    }
};

export default fetchImageData;
