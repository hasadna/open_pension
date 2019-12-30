import fs from "fs";
import request from "request";
import { getProcesserUrl } from "services/config-service";

export default class ProcessorClient {
  async sendFile(file: string): Promise<string> {
    const body: any = await this.uploadToProcessor(file);
    if (body.data && body.data.files) {
      const fileName = Object.keys(body.data.files)[0];
      if (fileName) {
        const fileId = body.data.files[fileName].id;
        return `${getProcesserUrl()}/process/${fileId}`;
      }
    }
    return "unknown";
  }

  private uploadToProcessor(file: string): Promise<request.Response> {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: `${getProcesserUrl()}/upload`,
          formData: { files: [fs.createReadStream(file)] },
          json: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        },
        (error, response) => (error ? reject(error) : resolve(response.body))
      );
    });
  }
}
