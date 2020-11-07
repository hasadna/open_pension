import {handleKafkaMessage} from "./services/queue";

const message = '{"ID":1371,"filename":"unrecognize_file1604736415268244200.xlsx","path":"/app/download_files/unrecognize_file1604736415268244200.xlsx","downloaded":true,"url":"https://employersinfocmp.cma.gov.il/api/PublicReporting/downloadFiles?IdDoc=1874190\\u0026extention=XLSX","created_at":"2020-10-31T13:11:20Z","updated_at":"2020-11-07T08:06:55.3562377Z","deleted_at":null}';


const parsedMessage = JSON.parse(message);
handleKafkaMessage(parsedMessage);
