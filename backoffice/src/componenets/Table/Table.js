import "./Table.scss"
import {isEmpty} from 'lodash';
import {Link} from "react-router-dom";
export default ({title, headers, rows, navigationButton = {}, pager, emptyElement}) => {
  const {path, text} = navigationButton;

  return <section className="table">

    <section className="top">
      <span className="title">
        {title}
      </span>

      {!isEmpty(navigationButton) && <div className="navigation-button-wrapper">
        <Link to={path} className="navigation-button">{text}</Link>
      </div> }
    </section>

    <div className="table-wrapper">
      <table>
        <thead>
        <tr>
          {headers.map((header, key) => <td key={key}>{header}</td>)}
        </tr>
        </thead>

        <tbody>
        {rows.map((row, key) => <tr key={key}>
          {row.map((cell, key) => <td key={key}>{cell}</td>)}
        </tr>)}
        {isEmpty(rows) && <tr><td className="empty-row" colSpan={5}>
          {emptyElement}
        </td></tr>}
        </tbody>
      </table>
    </div>

    {pager && <section className="bottom">
      {pager}
    </section>}
  </section>
};
