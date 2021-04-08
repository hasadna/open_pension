import "./breadcrumbs.scss"
import {ArrowRight} from "Icons/Icons";

export const Breadcrumbs = ({crumbs}) => <ul className={"breadcrumbs"}>
  {crumbs.map((crumb, key) => <li key={key}>{crumb} {key != (crumbs.length - 1) && <ArrowRight />}</li>)}
</ul>

export const Crumb = ({icon, title}) => <><span className={"icon"}>{icon}</span> <span className={"title"}>{title}</span> </>


