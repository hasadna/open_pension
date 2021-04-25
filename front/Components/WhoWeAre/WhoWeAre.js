export default function WhoWeAre() {
  return <section className="who-we-are">
    <h4>אז מי אנחנו?</h4>
    <p className="text">
      אנו מתנדבים מטעם פרויקט פנסיה פתוחה, מבית הסדנא לידי ציבורי,<br />
      הינו פרויקט טכנולוגי המפתח כלים להנגשת עולם הפנסיה לציבור הרחב.<br />
      הפרויקט שם לו למטרה להעלות את המודעות בקרב הציבור הרחב לאופן ניהול כספי הפנסיה<br />
      הפרויקט הינו פרויקט התנדבותי, מבוסס קוד פתוח שכולל אנשי קוד, מעצבים, אנשי דאטה ואנשי שוק ההון.
    </p>

    <div className="staff">
      <ul>
        <li>
          <img src="/staff/roy.png"/>
          <span className="name">רועי סגל</span>
          <span className="job">מוביל טכני</span>
        </li>
      </ul>

      <img src="./svgs/graphs.svg" className="graphs" />
    </div>
  </section>
}
