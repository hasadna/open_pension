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
                const results = await this.api.patch('/api/fetcher-links', {
                    link: link,
                    file: fs.readFileSync(file).toString('base64'),
                    name: name,
                });

                console.log(`${link}: ${results.data}`);

                resolve();
            }
            catch (e) {
                console.error(e);
                reject(e);
            }
        });
    }
}
