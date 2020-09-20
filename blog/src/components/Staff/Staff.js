import React from "react";
import "./Staff.scss"
import Roy from "./roy.jpeg"

export default () => {
    const staff = [
        {name: 'רועי סגל', position: 'מוביל טכני', picture: Roy}
    ];
    return <div className="staff">
        {staff.map((peron, key) => <div key={key} className="person">
            <img src={peron.picture} alt={`תמונה של ${peron.name}`}/>

            <div className="info">
                <span className="name">{peron.name}</span>
                <span className="position">{peron.position}</span>
            </div>
        </div>)}


    </div>
}
