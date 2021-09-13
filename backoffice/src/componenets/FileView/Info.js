export default ({uploadedAt, numberOfRows}) => <div className="file-info">
  <div className="info-item">
    <span>Uploaded at: </span> {uploadedAt}
  </div>

  <div className="info-item">
    <span>Number of rows: </span> {numberOfRows}
  </div>
</div>
