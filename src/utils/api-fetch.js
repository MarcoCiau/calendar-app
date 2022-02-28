const baseUrl = process.env.REACT_APP_API_URL;
/*
MSG Interceptor to update JWT
{
    "status": false,
    "msg": "Invalid or Expired JWT",
    "error": {
        "name": "TokenExpiredError",
        "message": "jwt expired",
        "expiredAt": "2022-02-24T15:11:50.000Z"
    }
}
*/
const requestInterceptor = async (response) => {
    if (response.status === true) return true;
    if (response.status === false && response.msg === "Invalid or Expired JWT")
    {
        const refreshToken = localStorage.getItem("refreshToken") || "";
        const result = await executePostReq("", "/auth/refreshToken", {refreshToken});
        if (result.status) {
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            localStorage.setItem('loggedDatetime', new Date().getTime());
        }
    }
    return false;
}

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
    executeGetRequest,
    requestInterceptor
}