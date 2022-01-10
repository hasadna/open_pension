import InfoTooltip from "../InfoTooltip/InfoTooltip";
import useChoicesState from "../Hooks/useChoicesStates";

export default function ButtonGroups({title, buttons, selectHandler, defaultActiveButton, description = null, multiple = false}) {
  const {optionIsSelected, handleButtonClick} = useChoicesState({defaultActiveButton, selectHandler, multiple});
  const getButtonClass = (identifier) => optionIsSelected(identifier) ? 'active' : null;

  return <div className="buttons-group">
    <div className="title-wrapper">
      <span className="title" data-testid="title">{title}</span>
      {description && <div className="info-wrapper" data-testid="description"><InfoTooltip description={description} /></div>}
    </div>

    <ul data-testid="items-wrapper">
      {Object
        .entries(buttons)
        .map(([identifier, value], key) =>
          <li key={key}>
            <a href="#"
               onClick={handleButtonClick}
               data-identifier={identifier}
               className={getButtonClass(identifier)}
               data-testid="item"
            >{value}</a>
          </li>
        )
      }
    </ul>
  </div>
}
