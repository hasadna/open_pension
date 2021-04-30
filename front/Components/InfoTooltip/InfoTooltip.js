import {useState} from 'react';

export default function InfoTooltip({description}) {
  const [isOn, setIsOn] = useState(false);
  const image = isOn ? 'info-open' : 'info-close';
  const handleClick = (e) => {
    e.preventDefault();
    setIsOn(!isOn);
  }

  return <div className={`info-tooltip ${isOn ? 'on' : 'off'}`}>
    <div className="a-wrapper">
      <a href="#" onClick={handleClick}>i</a>
    </div>

    {isOn && <p>{description}</p>}
  </div>
}
