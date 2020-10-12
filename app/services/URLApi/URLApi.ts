import axios from 'axios';

export const developmentHost = 'https://stagging-api-kta.pks.id/api';
export const productionHost = 'https://stagging-api-kta.pks.id/api';

const ROOT_API = axios.create({
    baseURL: `${process.env.NODE_ENV === "development" ? developmentHost : productionHost}`,
    headers: {
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2dpbmctYXBpLWt0YS5wa3MuaWRcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MDExMTExNjUsImV4cCI6MTYwMTExNDc2NSwibmJmIjoxNjAxMTExMTY1LCJqdGkiOiJrYm9mZFlPVkFFWk9XbnBIIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Ccz8k8_waBNjGoE69JDo7B__5KcDyo3xqWQgHWwB5HY`,
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
        return res.data
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