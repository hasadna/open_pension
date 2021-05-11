import {Search} from "../Icons/Incons";
import {useState} from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function HoldingsSearch({bodies, setSelectedBody}) {

  const [showBodies, setShowBodies] = useState(false);
  const [filteredBodies, setFilteredBodies] = useState([]);
  const [currentSearchValue, setCurrentSearchValue] = useState(null);

  const handleFilterBodies = (event) => {
    const {target: {value}} = event;
    setCurrentSearchValue(value);
    setFilteredBodies(bodies.filter((item) => item.includes(value)));
  }

  const bodiesToShow = () => {
    if (currentSearchValue) {
      return filteredBodies;
    }
    return currentSearchValue ? filteredBodies : bodies;
  }

  return <div className="holding-searching">
    <Search />
    <input
      placeholder="חפש את שם החברה בה הכסף שלך מושקע"
      onFocus={() => {setShowBodies(true)}}
      onChange={(e) => {handleFilterBodies(e)}}
    />
    <div className="info-wrapper">
      <InfoTooltip description={"אפשר להתחיל לכתוב שמות של גופים פנסיונים ולבחור מהרשימה את הגוף הרצוי"} />
    </div>

    {showBodies && <ul className="bodies">
      {Object.entries(bodiesToShow()).map(([, body], key) => <li key={key} className="item">
        <a href="#" onClick={(e) => {
          e.preventDefault();
          setShowBodies(false);
          setSelectedBody(body);
        }}>{body}</a>
        </li>)}
      {bodiesToShow().length === 0 && <li className="empty">לא נמצאו גופים</li>}
    </ul> }
  </div>
}
