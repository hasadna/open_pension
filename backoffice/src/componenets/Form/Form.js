import "./FormWrapper.scss";
import RoundedElement from "../RoundedElement/RoundedElement";

export const Form = ({children, title, actions}) => {

  return <RoundedElement>
    <section className="form">
      <section className="header"><span className="title">{title}</span></section>
      <section className="main">{children}</section>
      <section className="footer">{actions}</section>
    </section>
  </RoundedElement>
}

export const Section = ({title, children}) => {

  return <section className="section">
    <span className="section-title">{title}</span>

    <section className="elements">
      {children}
    </section>
  </section>
}

export const Input = ({title, type= "text", error, ...props}) => {

  return <div className="input-wrapper">
    <label>{title}</label>

    <input type={type} {...props} className={`input ${error && 'error'}`} />
    {error && <span className="input-error">{error}</span>}
  </div>
}

export const Button = ({children, type, waiting = false, ...props}) => <button className={`button button-${type} ${waiting ? 'on-click' : ''}`} {...props}>{children}</button>;
