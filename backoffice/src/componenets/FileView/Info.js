export default ({uploadedAt, numberOfRows, error}) => <div className="file-info">
  <div className="info-item">
    <span>Uploaded at: </span> {uploadedAt}
  </div>

  <div className="info-item">
    <span>Number of rows: </span> {numberOfRows}
  </div>

  {error && <div className="info-item">
    <span>Error: </span> {error}
  </div>}
</div>
