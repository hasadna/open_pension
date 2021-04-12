import "./Pager.scss";
import {ArrowLeft, ArrowRight} from "Icons/Icons";

export default ({ totalCount, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return <section className="pager">
    <ul>
      <li className={`arrows ${currentPage === 0 ? 'disabled' : ''}`}><ArrowLeft /></li>

      {Array(totalPages)
        .fill('')
        .map((item, key) => <li
          className={`item ${currentPage === key ? 'active' : ''}`}
          key={key}
          onClick={() => {setCurrentPage(key)}}>
          {key + 1}
        </li>)
      }

      <li className={`arrows ${currentPage === (totalPages - 1) ? 'disabled' : ''}`}><ArrowRight /></li>
    </ul>
  </section>
}
