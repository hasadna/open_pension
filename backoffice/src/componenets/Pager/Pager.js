import "./Pager.scss";
import {ArrowLeft, ArrowRight} from "Icons/Icons";

export default ({ totalCount, itemsPerPage, currentPage, setCurrentPage }) => <section className="pager">
  <ul>
    <li className="arrows"><ArrowLeft /></li>

    {Array(Math.ceil(totalCount / itemsPerPage))
      .fill('')
      .map((item, key) => <li className={`item ${currentPage === key ? 'active' : ''}`} key={key} onClick={() => {setCurrentPage(key)}}>{key + 1}</li>)}

    <li className="arrows"><ArrowRight /></li>
  </ul>
</section>
