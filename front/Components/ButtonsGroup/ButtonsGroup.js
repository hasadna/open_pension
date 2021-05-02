import {useState} from 'react';
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function ButtonGroups({title, buttons, selectHandler, defaultActiveButton, description = null, multiple = false}) {

  const [activeButtons, setActiveButtons] = useState(() => {
    if (defaultActiveButton) {
      return {[defaultActiveButton]: true};
    }

    return {};
  });

  const existsSelectedButtons = Object.keys(activeButtons);
  const optionIsSelected = (identifier) => {
    if (existsSelectedButtons.includes(identifier)) {
      return activeButtons[identifier];
    }

    return false;
  }

  const handleButtonClick = (e) => {
      e.preventDefault();

      const {target: {dataset: {identifier}}} = e;

      if (multiple) {
        setActiveButtons({...activeButtons, ...{[identifier]: !optionIsSelected(identifier)}});
      }
      else {
        setActiveButtons({[identifier]: !optionIsSelected(identifier)});
      }

      if (selectHandler) {
        selectHandler(activeButtons);
      }
  };

  const getButtonClass = (identifier) => optionIsSelected(identifier) ? 'active' : null;

  return <div className="buttons-group">
    <div className="title-wrapper">
      <span className="title">{title}</span>
      {description && <div className="info-wrapper"><InfoTooltip description={description} /></div>}
    </div>

    <ul>
      {Object
        .entries(buttons)
        .map(([identifier, value], key) =>
          <li key={key}>
            <a href="#"
               onClick={handleButtonClick}
               data-identifier={identifier}
               className={getButtonClass(identifier)}
            >{value}</a>
          </li>
        )
      }
    </ul>
  </div>
}
