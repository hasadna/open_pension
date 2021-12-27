import {useCallback, useState} from "react";
import {ArrowDown, ArrowUp, Checkbox, Checked, UnChecked} from "../Icons/Incons";
import useChoicesState from "../Hooks/useChoicesStates";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default ({title, firstOption, options, allowSearch = false, defaultActiveButton, selectHandler, multiple, description = ''}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const {optionIsSelected, handleButtonClick} = useChoicesState({defaultActiveButton, selectHandler, multiple});

  return <div className="dropdown-wrapper">
    <div className="title-wrapper">
      <span className="title" data-testid="title">{title}</span>
      {description && <div className="info-wrapper" data-testid="description"><InfoTooltip description={description} /></div>}
    </div>

    <div className="dropdown-menu">
      <div className="header" onClick={() => {toggle()}}>
        <span>{firstOption}</span>
        <button>{isOpen ? <ArrowUp /> : <ArrowDown />}</button>
      </div>

      {isOpen && <div>
        <div className="options">
          {allowSearch && <input placeholder={"הזו טקסט לסינון תוצאות"}/>}
          <ul>
            {Object.entries(options).map(([value, label], key) => <li key={key}>
              <a onClick={handleButtonClick} data-identifier={value}><input type='checkbox' data-identifier={value} checked={optionIsSelected(value)} /> {label}</a>
            </li>)}
          </ul>
        </div>
      </div> }
    </div>
  </div>


};
