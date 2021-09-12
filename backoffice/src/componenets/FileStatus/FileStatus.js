import Status from "../Status/Status";

const fileStatusHandler = {
  sent: {text: 'Sent to storage', icon: 'warning'},
  processStarted: {text: 'Processing started', icon: 'warning'},
  stored: {text: 'Stored by the service', icon: 'info'},
  storedByService: {text: 'Stored by the service', icon: 'info'},
  processed: {text: 'Processed successfully', icon: 'ok'},
  processedWithError: {text: 'Processed with errors', icon: 'error'},
};

const handleFileStatus = (fileStatus) => Object.keys(fileStatusHandler).includes(fileStatus) ?
  fileStatusHandler[fileStatus] :
  'Unknown';


export default ({file}) => {
  const {text, icon} = handleFileStatus(file.status);
  return <Status status={icon}>{text}</Status>
}
