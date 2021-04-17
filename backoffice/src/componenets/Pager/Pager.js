import "./Pager.scss";
import {ArrowLeft, ArrowRight} from "Icons/Icons";

export default ({ totalCount, itemsPerPage, page, setPage }) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (totalPages <= 1) {
    return <></>
  }

  const prevDisabled = page === 0;
  const nextDisabled = page + 1 === totalPages;

  const arrowClickHandler = (arrowType) => {
    if (arrowType === 'prev' && !prevDisabled) {
      setPage(page - 1);
    }

    if (arrowType === 'next' && !nextDisabled) {
      setPage(page + 1);
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
          className={`item ${page === key ? 'active' : ''}`}
          key={key}
          onClick={() => {setPage(key)}}>
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
