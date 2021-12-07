import {useCallback, useState} from 'react';
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const useChoicesStates = ({defaultActiveButton = null}) => {
  const [activeButtons, setActiveButtons] = useState(() => {
    if (defaultActiveButton) {
      return {[defaultActiveButton]: true};
    }

    return {};
  });

  return {
    buttonsState: [activeButtons, setActiveButtons],
    optionIsSelected: useCallback((identifier) => {
      const existsSelectedButtons = Object.keys(activeButtons);
      if (existsSelectedButtons.includes(identifier)) {
        return activeButtons[identifier];
      }

      return false;
    }, [activeButtons])
  };
};


export default function ButtonGroups({title, buttons, selectHandler, defaultActiveButton, description = null, multiple = false}) {
  const {
    buttonsState: [activeButtons, setActiveButtons],
    optionIsSelected,
  } = useChoicesStates({defaultActiveButton});

  const handleButtonClick = useCallback((e) => {
    e.preventDefault();
    const {target: {dataset: {identifier}}} = e;
    let activeButtonState;

    if (multiple) {
      activeButtonState = {
        ...activeButtons,
        ...{[identifier]: !optionIsSelected(identifier)}
      };
    }
    else {
      if (optionIsSelected(identifier)) {
        // This one is already selected so we cannot un-check it when we a single mode.
        return;
      }

      activeButtonState = {[identifier]: !optionIsSelected(identifier)};
    }

    setActiveButtons(activeButtonState);

    if (selectHandler) {
      selectHandler(activeButtonState);
    }
  }, []);

  // const handleButtonClick = (e) => {
  //     e.preventDefault();
  //     const {target: {dataset: {identifier}}} = e;
  //     let activeButtonState;
  //
  //     if (multiple) {
  //       activeButtonState = {
  //         ...activeButtons,
  //         ...{[identifier]: !optionIsSelected(identifier)}
  //       };
  //     }
  //     else {
  //       if (optionIsSelected(identifier)) {
  //         // This one is already selected so we cannot un-check it when we a single mode.
  //         return;
  //       }
  //
  //       activeButtonState = {[identifier]: !optionIsSelected(identifier)};
  //     }
  //
  //     setActiveButtons(activeButtonState);
  //
  //     if (selectHandler) {
  //       selectHandler(activeButtonState);
  //     }
  // };

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
