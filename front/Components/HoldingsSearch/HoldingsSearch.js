import {Search} from "../Icons/Incons";
import {useState, useEffect} from "react";

export default function HoldingsSearch() {

  const [showBodies, setShowBodies] = useState(false);
  const [bodies, setBodies] = useState([]);
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

  useEffect(() => {
    setBodies(['אלטשולר שחם'
      , 'כלל ביטוח'
      , 'מנורה מבטחים']);
  }, []);

  return <div className="holding-searching">
    <Search />
    <input
      placeholder="חפש את שם החברה בה הכסף שלך מושקע"
      onFocus={() => {setShowBodies(true)}}
      onBlur={() => {setShowBodies(false)}}
      onChange={(e) => {handleFilterBodies(e)}}
    />

    {showBodies && <ul className="bodies">
      {bodiesToShow().map((body, key) => <li key={key} className="item">{body}</li>)}
      {bodiesToShow().length === 0 && <li className="empty">לא נמצאו גופים</li>}
    </ul> }
  </div>
}
