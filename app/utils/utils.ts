import sha256 from 'js-sha256'
import { domainApi } from '../services/URLApi/URLApi'
import * as dns from 'dns'
import { ipcRenderer, remote } from 'electron';
import { autoUpdater } from 'electron-updater';
const { app } = remote
import fs from 'fs'
import fsj from 'fs-jetpack'
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

    const sourceFile = "app/database/kta-pks.sql"
    console.log("🚀 ~ file: Utils.ts ~ line 21 ~ copyInitialDB ~ sourceFile", sourceFile)
    const pathFile = app.getPath('userData') + '/databases/kta-pks.sql'

    console.log(fs.existsSync(pathFile));

    try {
        if (fs.existsSync(pathFile)) {
            //file exists
            console.log('Database exist, proceeding ...');

        } else {
            // fs.copyFile('./resources/app.asar/app/database/kta-pks.sql', pathFile, (err) => {
            //     if (err) throw err;
            //     console.log('Initial database was copied');
            // });
            await copyFileOutsideOfElectronAsar("dist/app/database/kta-pks.sql", app.getPath('userData') + "/databases/kta-pks.sql")
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

const copyFileOutsideOfElectronAsar = async (sourceInAsarArchive: any, destOutsideAsarArchive: any) => {
    if (fs.existsSync(app.getAppPath() + "/" + sourceInAsarArchive)) {

        // file will be copied
        if (fs.statSync(app.getAppPath() + "/" + sourceInAsarArchive).isFile()) {

            fsj.file(destOutsideAsarArchive, { content: fs.readFileSync(app.getAppPath() + "/" + sourceInAsarArchive) });
            console.log('condition 1');

        }

        // dir is browsed
        else if (fs.statSync(app.getAppPath() + "/" + sourceInAsarArchive).isDirectory()) {
            console.log('condition 2');

            fs.readdirSync(app.getAppPath() + "/" + sourceInAsarArchive).forEach(function (fileOrFolderName) {

                copyFileOutsideOfElectronAsar(sourceInAsarArchive + "/" + fileOrFolderName, destOutsideAsarArchive + "/" + fileOrFolderName);
            });
        }
    } else {
        console.log("file doesn't exist");

    }

}