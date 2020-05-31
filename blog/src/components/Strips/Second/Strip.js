import React from "react"
import "./style.scss";

export const SecondStrip = () => <section className="tools">
  <a id="tools"></a>
  <div className="text">
    <p className="medium">הכלים שלנו</p>
    <h2>מודיעין פיננסי בקוד פתוח</h2>
    <p className="big">
      מסד נתונים בלעדי ופתוח לציבור ומרכז את כל נתוני שוק הפנסיה
    </p>

    <div className="grid-display">

      <div>
        <h3 className="title"><a href="{{.Permalink}}">asdasd</a></h3>

        <img src="{{$sheet_image.Permalink}}" alt="דוח ראשון"/>
      </div>

    </div>
  </div>
</section>
