import React from "react"
import "./style.scss";

export const ThirdStrip = () => <section className="articles">
  <a id="articles"></a>
  <div className="text">
    <p className="medium">כתבות</p>
    <h2>הדוחות המעמיקים בתחום</h2>
    <p className="big">
      מידע שמאפשר לעיתונאים ואקטיביסטים לספר את הסיפור המלא
    </p>

    <div className="grid-display">

      <div>
        <h3 className="title"><a href="saads" target="_blank">sadsad</a></h3>
        <p className="sub-title">asasd, asasd</p>

        <img src="{{$article_image.Permalink}}" alt="דוח ראשון" className="bordered"/>
      </div>
    </div>
  </div>

</section>
