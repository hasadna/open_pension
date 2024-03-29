import "./FormWrapper.scss";
import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {useEffect, useState} from "react";
import {EditorState, convertFromHTML, ContentState} from "draft-js";
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html'
import {isEmpty} from 'lodash';

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

    <input type={type} {...props} className={`form-element input ${error && 'error'}`} />
    {error && <span className="input-error">{error}</span>}
  </div>
}

export const Select = ({title, error, options = [], defaultValue, firstOption, ...props}) => {

  return <div className="input-wrapper">
    <label>{title}</label>

    <select className={`form-element select ${error && 'error'}`} {...props}>
      {firstOption && <option>{firstOption}</option>}
      {options.map(({text, value}, key) => <option key={key} value={value} selected={defaultValue === value}>{text}</option>) }
    </select>
    {error && <span className="input-error">{error}</span>}
  </div>
}

export const Text = ({children}) => {
  return <p className={"text"}>
    {children}
  </p>
};

export const Editor = ({label, changeContentCallback, error, value}) => {
  const [editorState, setEditorStage] = useState( EditorState.createEmpty());
  const [originalValue, setOriginalValue] = useState();

  useEffect(() => {
    if (!originalValue) {
      setOriginalValue(value);
    }
  }, [value])

  useEffect(() => {
    if (originalValue) {
      setEditorStage(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(originalValue)
        )
      ));
    }

  }, [originalValue]);

  return <div className="input-wrapper">
    <label>{label}</label>

    <DraftEditor
      editorState={editorState}
      wrapperClassName="draft-wrapper "
      editorClassName="demo-editor"
      onContentStateChange={(contentState) => {
        changeContentCallback(draftToHtml(contentState));
      }}
      onEditorStateChange={(editorState) => {setEditorStage(editorState)}}
    />
    {error && <span className="input-error">{error}</span> }
  </div>
}

export const Button = ({children, type, waiting = false, ...props}) => <button className={`button button-${type} ${waiting ? 'on-click' : ''}`} {...props}>{children}</button>;
