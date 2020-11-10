import axios from 'axios';

export const developmentHost = 'https://stagging-api-kta.pks.id/api';
export const productionHost = 'https://stagging-api-kta.pks.id/api';
export const domainApi = 'stagging-api-kta.pks.id'

const ROOT_API = axios.create({
    baseURL: `${process.env.NODE_ENV === "development" ? developmentHost : productionHost}`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")?.replace(/"/g, '')}`,
        'Content-Type': 'application/json',

    }
})

export const clientGet = async (endPoint: string, params: object) => {
    try {
        let getData = await ROOT_API.get(endPoint, { params: params })
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