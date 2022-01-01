import {useCallback, useMemo, useState} from "react";
import {ArrowDown, ArrowUp, Checkbox, Checked, Close, UnChecked} from "../Icons/Incons";
import useChoicesState from "../Hooks/useChoicesStates";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import {isEmpty} from "lodash";

export default ({title, firstOption, options, allowSearch = false, defaultActiveButton, selectHandler, multiple, description = ''}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const filterOptions = (callback) => {

    let newMatchedResults = {};

    Object.entries(options).filter(callback).forEach(([identifier, option]) => {
      newMatchedResults[identifier] = option;
    });

    return newMatchedResults;
  }

  const currentOptions = useMemo(() => {
    if (isEmpty(searchText)) {
      return options;
    }

    return filterOptions(([_, option]) => option.includes(searchText));

  }, [searchText]);

  const {optionIsSelected, handleButtonClick, activeButtons} = useChoicesState({defaultActiveButton, selectHandler, multiple});

  const calculateDisplay = useMemo(() => {
    if (isEmpty(activeButtons)) {
      return firstOption;
    }

    const selectedOptions = Object.keys(activeButtons);

    if (multiple) {
      const returnValue = Object.entries(filterOptions(([key]) => {
        if (selectedOptions.includes(key)) {
          return activeButtons[key];
        }
      }))
        .map(([_, selectedOption])=> selectedOption)
        .join(", ");

      if (returnValue) {
        return returnValue;
      }

      return firstOption;
    }

    return options[selectedOptions[0]]
  }, [firstOption, activeButtons, currentOptions]);

  return <div className="dropdown-wrapper">
    <div className="title-wrapper">
      <span className="title" data-testid="title">{title}</span>
      {description && <div className="info-wrapper" data-testid="description"><InfoTooltip description={description} /></div>}
    </div>

    <div className="dropdown-menu">
      <div className="header" onClick={() => {toggle()}}>
        <div className="text" title={calculateDisplay}>{calculateDisplay}</div>
        <button>{isOpen ? <ArrowUp /> : <ArrowDown />}</button>
      </div>

      {isOpen && <div>
        <div className="options">
          {allowSearch && <div className="search-input-wrapper">
            <input placeholder={"הזו טקסט לסינון תוצאות"} className="search" value={searchText} onChange={e => setSearchText(e.target.value)}/>
            {searchText && <button className="close-button" onClick={() => setSearchText('')}>X</button> }
          </div>}

          {searchText && isEmpty(currentOptions) && <div className='no-results'>לא נמצאו תוצאות</div> }
          <ul>
            {Object.entries(currentOptions).map(([value, label], key) => <li key={key} onClick={handleButtonClick} data-identifier={value}>
              <input type='checkbox' data-identifier={value} checked={optionIsSelected(value)} />
              <a > {label}</a>
            </li>)}
          </ul>
        </div>
      </div> }
    </div>
  </div>


};
