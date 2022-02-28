const baseUrl = process.env.REACT_APP_API_URL;

const executeAPIRequest = async (method="GET", endpoint="", body={}) => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: method,
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(body)
    });
    const data = await response.json(); 
    return data;
}


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
    const data = await response.json(); 
    return data;
}

const executeGetRequest = async (endpoint="") => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'x-token': token
        },
    });
    const data = await response.json();
    return data;
}

export {
    executeAPIRequest,
    executePostReq,
    executeGetRequest
}