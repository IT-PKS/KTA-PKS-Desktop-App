import initSQLite from '../services/sqlite/initSQLite';
import { Member } from "../entity/Member";
import { clientPost } from '../services/URLApi/URLApi';
import { ipcRenderer, remote } from 'electron';
const { app } = remote
import fs from 'fs'

export const saveToLocal = async (payload: any, data: any) => {
    const sqlite: any = await initSQLite()
    if (data) {
        payload['isSentToBackend'] = true
    } else {
        payload['isSentToBackend'] = false
    }
    try {
        // copy file (offline upload)
        const sourceKTP = payload.ktp_file[0].path
        const sourceProfilePicture = payload.profile_file[0].path
        const destination = app.getPath('userData') + '/'
        fs.copyFile(sourceKTP, destination + payload.ktp_file[0].name, (err) => {
            if (err) throw err;
            console.log('file ktp uploaded locally');
        });
        fs.copyFile(sourceProfilePicture, destination + payload.profile_file[0].name, (err) => {
            if (err) throw err;
            console.log('file profile uploaded locally');
        });

        const member = new Member(payload)
        const res = await sqlite.manager.save(member)
        sqlite.close()

        return res
    } catch (error) {
        sqlite.close()
        throw error
    }
}

export const postMembersRegistration = async (payload: object) => {
    return await clientPost('members/registration', payload)
}