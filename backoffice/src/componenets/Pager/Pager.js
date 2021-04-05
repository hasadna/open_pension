import "./Pager.scss";
import {ArrowLeft, ArrowRight} from "../../Icons/Icons";

export default ({ Pages, baseURL }) => <section className="pager">
  <ul>
    <li className="arrows"><ArrowLeft /></li>
    <li className="item active">1</li>
    <li className="item">2</li>
    <li className="item">3</li>
    <li className="arrows"><ArrowRight /></li>
  </ul>
</section>
