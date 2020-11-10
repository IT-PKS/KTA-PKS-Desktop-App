import sha256 from 'js-sha256'
import { remote } from 'electron';
import { domainApi } from '../services/URLApi/URLApi'
import * as dns from 'dns'

export const checkInternetConnection = async () => {
    return new Promise((resolve, reject) => {
        dns.resolve(domainApi, (err) => {
            if (err) reject(err);
            resolve('connected');
        });
    });
};