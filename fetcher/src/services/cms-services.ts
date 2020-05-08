import axios, {AxiosInstance} from "axios";
import {BASE_URL} from "../consts";

export default class CmsService {

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL
        });
    }

    public sendLinkAddress(link: string) {
        this.api.post('a',{link});
    }

    public async sendFile(link: string, file: any): Promise<boolean> {
        const results = await this.api.patch('b', {link: link, file: file});

        return results.status === 200;
    }

}