import { domainApi } from '../services/URLApi/URLApi'
import * as dns from 'dns'
import { ipcRenderer, remote } from 'electron';
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

    // const sourceFile = "app/database/kta-pks.sql"
    const pathFile = app.getPath('userData') + '/databases/kta-pks.sql'

    

    try {
        if (fs.existsSync(pathFile)) {
            //file exists
            

        } else {
            // fs.copyFile('./resources/app.asar/app/database/kta-pks.sql', pathFile, (err) => {
            //     if (err) throw err;
            //     
            // });
            await copyFileOutsideOfElectronAsar("dist/app/database/kta-pks.sql", app.getPath('userData') + "/databases/kta-pks.sql")
        }
    } catch (err) {
        console.error(err)
    }
};

export const checkApplicationUpdate = async () => {
    ipcRenderer.on('message', (event: any, text: any) => {
        if (text === 'Update available') {
            const r = confirm("Update Available, do you want to update ?");
            if (r === true) {
                // autoUpdater.downloadUpdate()
            } else {
                
                
                
            }
        }

    })

    ipcRenderer.on('version', (event: any, text: any) => {

        
        

    })
};

const copyFileOutsideOfElectronAsar = async (sourceInAsarArchive: any, destOutsideAsarArchive: any) => {
    if (fs.existsSync(app.getAppPath() + "/" + sourceInAsarArchive)) {

        // file will be copied
        if (fs.statSync(app.getAppPath() + "/" + sourceInAsarArchive).isFile()) {

            fsj.file(destOutsideAsarArchive, { content: fs.readFileSync(app.getAppPath() + "/" + sourceInAsarArchive) });
            

        }

        // dir is browsed
        else if (fs.statSync(app.getAppPath() + "/" + sourceInAsarArchive).isDirectory()) {
            

            fs.readdirSync(app.getAppPath() + "/" + sourceInAsarArchive).forEach(function (fileOrFolderName) {

                copyFileOutsideOfElectronAsar(sourceInAsarArchive + "/" + fileOrFolderName, destOutsideAsarArchive + "/" + fileOrFolderName);
            });
        }
    } else {
        

    }

}