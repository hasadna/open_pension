export default function Table({headers, rows}) {
  return <table className="table">
    <thead>
    <tr>
      {headers.map((header, key) => <td key={key}>{header}</td>)}
    </tr>
    </thead>

    <tbody>

    {rows.map((row, key) => <tr key={key}>
      {row.map((cell, key) => <td key={key}>{cell}</td>)}
    </tr>)}

    </tbody>
  </table>
}
