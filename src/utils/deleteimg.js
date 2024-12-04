import Cookies from 'js-cookie';

const deleteimg = async (image_id) => {

    const url = "http://localhost:8000/images/delete-image"
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
        console.log("res: ", response)
        console.log("data: ", data)
        console.log("data: ", Cookies.get('token'))
        console.log("image id : ", image_id)
        return [response, data]
    }
    catch {
        return [null, null]
    }
}

export default deleteimg;