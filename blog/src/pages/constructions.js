import React from "react";
import {Wrapper} from "../components/Page";
import {Helmet} from "react-helmet";
import "./constructions.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHammer} from "@fortawesome/free-solid-svg-icons";

export default function constructions() {
    return (
        <Wrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>פנסיה פתוחה | עבודים על זה</title>
            </Helmet>

            <div className="constructions">
                <article>
                    <section className="text">
                        <h2>האיזור האישי בתהליכי פיתוח</h2>
                        <p>היי, החלק הזה בתהליכי פיתוח ואנחנו מקווים לסיים את זה מהר.</p>
                        <p>באיזור האישי תוכלו לראות היכן הכסף ששמור בקרן הפנסיה שלכם מושקע: נכסי נדל״ו, מט״ח, אג״חים ועוד.</p>
                    </section>

                    <section className="icon">
                        <FontAwesomeIcon icon={faHammer} />
                    </section>
                </article>

            </div>

        </Wrapper>
    )
}
