import Link from 'next/link'
import FrontpageArticles from "../FrontpageArticles/FrontpageArticles";

export default function FrontpageNavigation() {

  const links = [
    {
      title: 'ביצועים',
      descriptions: [
        <p>או במילים פשוטות באיזו מהחברות הקיימות היום בשוק</p>,
        <p>מוחזרת קופת הפנסיה / קופת הגמל שלי.</p>,
      ],
      path: '/performance'
    },
    {
      title: 'מבנה תיק',
      descriptions: [
        <p>או במילים פשוטות ... </p>,
      ],
      path: '/performance'
    },
    {
      title: 'אחזקות',
      descriptions: [
        <p>או במילים פשוטות היכן השקיעו חברות הפנסיה ת הכסף שלי,</p>,
        <p>והאם הכסף שלי עלה או ירד מאז שהוא מושקע באותם חברות.</p>,
      ],
      path: '/performance'
    },
  ];

  return <section className="frontpage-navigation">
    <p className="text">
      בואו נתחיל לבדוק מה הכסף שלנו עושה,<br />
      אתר פנסיה פתוחה מאפשר לך לעקוב בצורה פשוטה אחר החסכונות שלך<br />
      ולהבין, כמה אתה מרוויח, איך הכספים מנוהלים ובמה אתה מושקע.
    </p>

    <ul className="internal-links">
      {links.map(({title, descriptions, path}, key) => <li key={key}>
        <h4 className="link-title">{title}</h4>
        <div className="descriptions">
          {descriptions.map((description, key) => <p key={key}>{description}</p>)}
        </div>
        <Link className="link" href={path}> > </Link>
      </li>)}
    </ul>

    <FrontpageArticles />
  </section>
}
