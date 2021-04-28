import {useState} from 'react';
import Info from "../Info/Info";

export default function ButtonGroups({title, buttons, selectHandler, defaultActiveButton}) {

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
    <div>
      <span className="title">{title}</span>
      <Info description={"a"} />
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
