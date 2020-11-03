import axios from 'axios';

export const developmentHost = 'https://stagging-api-kta.pks.id/api';
export const productionHost = 'https://stagging-api-kta.pks.id/api';

const ROOT_API = axios.create({
    baseURL: `${process.env.NODE_ENV === "development" ? developmentHost : productionHost}`,
    headers: {
        // 'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2dpbmctYXBpLWt0YS5wa3MuaWRcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MDQ0MTQyMjYsImV4cCI6MTYwNDQxNzgyNiwibmJmIjoxNjA0NDE0MjI2LCJqdGkiOiJ5Z1k2aXpOcmJxZmNCYzhDIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JuiBUYGXWsMygFNXU1HU19qzFTx_c_BbQA55co4_Ldc`,
        'Content-Type': 'application/json',

    }
})

export const clientGet = async (endPoint: string, params: object) => {
    try {
        let getData = await ROOT_API.get(endPoint, params)
        if (getData.status === 200) return getData.data
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}

export const clientPost = async (endPoint: string, body: object) => {
    try {
        let res = await ROOT_API.post(endPoint, body)
        return { data: res.data }
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}

export const clientDelete = async (endPoint: string, params: object) => {
    try {
        let getData = await ROOT_API.delete(endPoint, params)

        if (getData.status === 200) return getData.data
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}


export const clientPatch = async (endPoint: string, body: object) => {
    try {
        let getData = await ROOT_API.patch(endPoint, body)

        if (getData.status === 200) return getData.data
    } catch (e) {
        const { data } = e.response;
        return { error: data }
    }
}