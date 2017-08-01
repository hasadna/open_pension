import { Component } from '@angular/core';

declare const introJs: any;

@Component({
  selector: 'op-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  intro: any;
  getIntro: Function;

  constructor() {
    this.intro = null;
  }

  genIntro() {
    if (this.intro) {
      return this.intro;
    } else {
      this.intro = introJs();
      this.intro.setOptions({
        nextLabel : 'המשך >>',
        prevLabel : '<< חזור',
        skipLabel : '',
        doneLabel : 'סגור',
        steps : [{
            element: document.querySelector('.filters-button.button-lightblue'),
            intro: `זוהי רשימת הפרמטרים שיופיעו בגרף. כל פעם יופיעו בגרף 4 פרמטרים (אלה הצבעונים בהתאמה).<br>
            אפשר לשנות את סדר הפרמטרים ע"י גרירה, ואפשר להוסיף פרמטרים נוספים.`,
            position: 'left',
          }, {
            element: document.querySelector('#pai'),
            intro: `כדי לראות את הפרטמר הבא ברשימה צריך ללחוץ על פלח במעגל הפנימי ואז הוא יהפוך להיות מרכז המעגל
            ופרמטר נוסף יתווסף כמעגל חיצוני מרשימת הפרמטרים.`,
            position: 'bottom'
          }, {
            element: document.querySelector('.filters-button.button-grey'),
            intro: 'כדי לחזור אחורה בעומק הפאי אפשר ללחוץ על הפרמטרים העליונים שכבר נעשתה בהם בחירה.',
            position: 'left'
          }, {
            element: document.querySelector('#pai'),
            intro: 'בשדה החיפוש אפשר לחפש כל פרמטר נוסף שיופיע במרכז הגרף כבסיס לו (למשל בית השקעות ספציפי / סוג מטבע / בנק ספציפי וכו).',
            position: 'top'
          }]
      });
      return this.intro;
    }
  }

  startIntro() {
    const intro = this.genIntro();
    intro.start();
  }

}
