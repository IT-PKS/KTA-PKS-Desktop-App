import sha256 from 'js-sha256'
import { domainApi } from '../services/URLApi/URLApi'
import * as dns from 'dns'
import { ipcRenderer, remote } from 'electron';
import { autoUpdater } from 'electron-updater';
const { app } = remote
import fs from 'fs'
export const checkInternetConnection = async (ms: number) => {
    return new Promise((resolve, reject) => {
        dns.resolve(domainApi, (err) => {
            if (err) reject(err);
            resolve('connected');
        });
        setTimeout(reject, ms);
    });
};

export const copyInitialDB = async () => {

    const pathFile = app.getPath('userData') + '/databases/kta-pks.sql'

    console.log(fs.existsSync(pathFile));


    try {
        if (fs.existsSync(pathFile)) {
            //file exists
            console.log('Database exist, proceeding ...');

        } else {
            fs.copyFile('app/database/kta-pks.sql', pathFile, (err) => {
                if (err) throw err;
                console.log('Initial database was copied');
            });
        }
    } catch (err) {
        console.error(err)
    }
};

export const checkApplicationUpdate = async () => {
    ipcRenderer.on('message', (event: any, text: any) => {

        console.log('hii')
        console.log(text)
        if (text === 'Update available') {
            const r = confirm("Update Available, do you want to update ?");
            if (r === true) {
                // autoUpdater.downloadUpdate()
            } else {
                console.log('====================================');
                console.log('update canceled');
                console.log('====================================');
            }
        }

    })

    ipcRenderer.on('version', (event: any, text: any) => {

        console.log('versi');
        console.log(text);

    })
};