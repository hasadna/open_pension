import {Search} from "../Icons/Incons";
import {useEffect, useState} from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function HoldingsSearch({bodies, setSelectedBody}) {

  const [showBodies, setShowBodies] = useState(false);
  const [filteredBodies, setFilteredBodies] = useState([]);
  const [currentSearchValue, setCurrentSearchValue] = useState(null);

  const clickHandler = ({target}) => {

    if (target.getAttribute('id') === 'search') {
      // This search element. No need to close the event.
      return;
    }

    const classList = target.classList;

    if (classList.contains('item-link') || classList.contains('item')) {
      // This a body item. When choosing an item from the list the autocomplete element will be closed.
      return;
    }

    setShowBodies(false);
  };

  useEffect(() => {
    window.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, []);

  const handleFilterBodies = (event) => {
    const {target: {value}} = event;
    setCurrentSearchValue(value);
    setFilteredBodies(Object.values(bodies).filter((item) => item.includes(value)));
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
      id={"search"}
      placeholder="חפש את שם החברה בה הכסף שלך מושקע"
      onFocus={() => {setShowBodies(true)}}
      onChange={(e) => {handleFilterBodies(e)}}
    />
    <div className="info-wrapper">
      <InfoTooltip description={"אפשר להתחיל לכתוב שמות של גופים פנסיונים ולבחור מהרשימה את הגוף הרצוי"} />
    </div>

    {showBodies && <ul className="bodies">
      {Object.entries(bodiesToShow()).map(([, body], key) => <li key={key} className="item">
        <a href="#" className="item-link" onClick={(e) => {
          e.preventDefault();
          setShowBodies(false);
          setSelectedBody(key);
        }}>{body}</a>
        </li>)}
      {bodiesToShow().length === 0 && <li className="empty">לא נמצאו גופים</li>}
    </ul> }
  </div>
}
