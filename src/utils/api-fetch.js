const baseUrl = process.env.REACT_APP_API_URL;

const executePostReq = async (token="", endpoint="", body={}) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(body)
    });
    return response.json();
}

export {
    executePostReq
}