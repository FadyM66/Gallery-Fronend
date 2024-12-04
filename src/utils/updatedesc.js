import Cookies from 'js-cookie';

const updatedesc = async (image_id, new_desc) => {

    const url = "http://localhost:8000/images/update-description"
    const formData = new FormData()
    formData.append("image_id", image_id)
    formData.append("description", new_desc)
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
        console.log("ND res: ", response)
        console.log("ND data: ", data)
        console.log("ND data: ", Cookies.get('token'))
        console.log("ND image id : ", image_id)
        return [response, data]
    }
    catch {
        return [null, null]
    }
}

export default updatedesc;