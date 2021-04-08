import "./TextWithActions.scss"
import {CircleArrowDown} from "Icons/Icons";

export default ({children, actions}) => <div className="text-with-actions">
  <span>{children}</span>
  <div className="actions-wrapper">
    <span className="action-title">Actions <CircleArrowDown /></span>

    <div className="menu">
      <ul>
        {actions.map((action, key) => {
          return <li key={key}>{action}</li>
        })}
      </ul>
    </div>

  </div>
</div>
