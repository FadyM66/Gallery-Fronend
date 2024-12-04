import Cookies from 'js-cookie';

const aigenerate = async (image_id) => {

    const url = "http://localhost:8000/images/generate-caption"
    const formData = new FormData()
    formData.append("image_id", image_id)
    try{
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "token": Cookies.get('token')
                },
                body: formData
            }
        )
        const data = await response.json()
        console.log("AI res: ", response)
        console.log("AI data: ", data)
        console.log("AI data: ", Cookies.get('token'))
        console.log("AI image id : ", image_id)
        return [response, data]
    }
    catch {
        return [null, null]
    }
}

export default aigenerate;