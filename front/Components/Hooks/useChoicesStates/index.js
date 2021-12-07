import {useState, useCallback} from "react";

export default ({selectHandler, defaultActiveButton = null, multiple = false}) => {
  const [activeButtons, setActiveButtons] = useState(() => {
    if (defaultActiveButton) {
      return {[defaultActiveButton]: true};
    }

    return {};
  });

  const optionIsSelected = useCallback((identifier) => {
    const existsSelectedButtons = Object.keys(activeButtons);
    if (existsSelectedButtons.includes(identifier)) {
      return activeButtons[identifier];
    }

    return false;
  }, [activeButtons]);

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
  }, [activeButtons]);

  return {
    optionIsSelected,
    handleButtonClick
  }
};
