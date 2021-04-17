import React from 'react';

export default () => {
  return <>
    <h1 className="h1">Title</h1>
    <h2 className="h2">Second title</h2>

    <p className="text">
      This is a nice text
    </p>

    <div className="message error">This is a warning message</div>
    <div className="message success">This is a success message</div>
    <div className="message info">This is an info message</div>
    <div className="message warning">This is an warning message</div>

    <button className="button button-ok">Login</button>
    <button className="button button-error">Login</button>
    <button className="button button-info">Login</button>
    <button className="button button-warning">Login</button>
  </>
}
