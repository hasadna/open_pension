import "./TextWithActions.scss"
import {CircleArrowDown} from "../../Icons/Icons";

export default ({children, actions}) => <div className="text-with-actions">
  <span>{children}</span>
  <div className="actions-wrapper">
    <span className="action-title">Actions <CircleArrowDown /></span>

    <div className="menu">
      <ul>
        {actions.map((action, key) => {
          const {title, handler} = action;
          return <li key={key}><a href={"#"} onClick={(e) => {
            e.preventDefault();
            handler();
          }}>{title}</a> </li>
        })}
      </ul>
    </div>

  </div>
</div>
