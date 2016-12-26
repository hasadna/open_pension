import {Component, OnInit, AfterViewInit} from '@angular/core';

declare var introJs;

@Component({
  selector: 'op-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    introJs().setOptions({nextLabel: 'הבא', prevLabel: 'הקודם',
      doneLabel: 'סיום', skipLabel: 'יציאה'})
      .start();
  }

  intros: string[] = [
    'כדי לחזור אחורה בעומק הפאי, אפשר ללחוץ על הפרמטרים העליונים שכבר נעשתה בהם בחירה',
    'כדי לראות את הפרמטר הבא ברשימה צריך ללחוץ על פלח במעגל הפנימי ואז הוא יהפוך להיות מרכז המעגל ופרמטר נוסף יתווסף כמעגל חיצוני מרשימת הפרמטרים '

  ]
  constructor() { }

  ngOnInit() {

  }

}
