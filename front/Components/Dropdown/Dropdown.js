import {useCallback, useState} from "react";
import {ArrowDown, ArrowUp, Checkbox} from "../Icons/Incons";
import useChoicesState from "../Hooks/useChoicesStates";

export default ({title, options, allowSearch = false, defaultActiveButton, selectHandler, multiple}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const {optionIsSelected, handleButtonClick} = useChoicesState({defaultActiveButton, selectHandler, multiple});

  return <div className="dropdown-menu">
    <div className="header">
      <span onClick={() => {toggle()}}>{title}</span>
      <button onClick={() => toggle()}>{isOpen ? <ArrowUp /> : <ArrowDown />}</button>
    </div>

    {isOpen && <div>
      <div className="options">
        {allowSearch && <input placeholder={"הזו טקסט לסינון תוצאות"}/>}
        <ul>
          {Object.entries(options).map(([value, label], key) => <li key={key}>
            <a onClick={handleButtonClick} data-identifier={value}><Checkbox data-identifier={value} checked={optionIsSelected(value)} /> {label}</a>
          </li>)}
        </ul>
      </div>
    </div> }
  </div>
};
