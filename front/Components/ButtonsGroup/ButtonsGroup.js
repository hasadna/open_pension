import {useState} from 'react';
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function ButtonGroups({title, buttons, selectHandler, defaultActiveButton, description = null}) {

  const [activeButton, setActiveButton] = useState(defaultActiveButton);

  const handleButtonClick = (e) => {
      e.preventDefault();
      const {target: {dataset: {identifier}}} = e;
      setActiveButton(identifier);
      if (selectHandler) {
        selectHandler(identifier);
      }
  };

  const getButtonClass = (identifier) => activeButton === identifier ? 'active' : null;

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
