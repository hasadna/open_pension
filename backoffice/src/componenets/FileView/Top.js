import FileStatus from "../FileStatus/FileStatus";

export default ({filename, status}) => <div className="top">
  <h3 className="title">{filename}</h3>
  <FileStatus file={{status}} />
</div>
