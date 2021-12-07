import {useCallback, useState} from "react";
import {ArrowDown, ArrowUp, Checkbox} from "../Icons/Incons";

export default ({title, options, allowSearch = false}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return <div className="dropdown-menu">
    <div className="header">
      <span onClick={() => {toggle()}}>{title}</span>
      <button onClick={() => toggle()}>{isOpen ? <ArrowUp /> : <ArrowDown />}</button>
    </div>

    {isOpen && <div>
      <div className="options">
        {allowSearch && <input placeholder={"הזו טקסט לסינון תוצאות"}/>}
        <ul>
          {Object.entries(options).map(([label, value], key) => <li key={key} onClick={() => setIsSelected(!isSelected)}>
            <Checkbox checked={isSelected} /> {value}
          </li>)}
        </ul>
      </div>
    </div> }
  </div>
};
