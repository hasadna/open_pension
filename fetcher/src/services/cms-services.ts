import axios, {AxiosInstance} from "axios";
import {getCmsHost} from "./config-service";
import fs from "fs";

export class CmsService {

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: getCmsHost()
        });
    }
    public async sendLinkAddress(link: string) {
        try {
            return await this.api.post('/api/fetcher-links',{link});
        } catch (e) {
            console.error(e);
            return null
        }
    }

    public async sendFile(link: string, file: any, name: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                // When sending a huge file, over 8MB, will crash the request
                // but will prevent from other files to be downloaded.
                // todo: fix it.
                await this.api.patch('/api/fetcher-links', {
                    link: link,
                    file: fs.readFileSync(file).toString('base64'),
                    name: name,
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity
                });

                console.log(`The file ${name} was sent`);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
