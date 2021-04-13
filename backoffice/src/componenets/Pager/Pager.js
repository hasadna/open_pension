import "./Pager.scss";
import {ArrowLeft, ArrowRight} from "Icons/Icons";

export default ({ totalCount, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const prevDisabled = currentPage === 0;
  const nextDisabled = currentPage + 1 === totalPages;

  const arrowClickHandler = (arrowType) => {
    if (arrowType === 'prev' && !prevDisabled) {
      setCurrentPage(currentPage - 1);
    }

    if (arrowType === 'next' && !nextDisabled) {
      setCurrentPage(currentPage + 1);
    }
  };

  return <section className="pager">
    <ul>
      <li
        className={`arrows ${prevDisabled ? 'disabled' : ''}`}
        onClick={(e) => {
        e.preventDefault();
        arrowClickHandler('prev');
      }}>
        <ArrowLeft />
      </li>

      {Array(totalPages)
        .fill('')
        .map((item, key) => <li
          className={`item ${currentPage === key ? 'active' : ''}`}
          key={key}
          onClick={() => {setCurrentPage(key)}}>
          {key + 1}
        </li>)
      }

      <li
        className={`arrows ${nextDisabled ? 'disabled' : ''}`}
        onClick={(e) => {arrowClickHandler('next');}}
      >
        <a><ArrowRight /></a>
      </li>
    </ul>
  </section>
}
