import {Play} from "../Icons/Incons";

export default function FrontpageArticles() {
  const links = [
    {
      icon: 'scooter.svg',
      title: <>
        <p>“יותר טוב שליש מכלום”</p>
        <p>המחיר שנשלם בגלל נפילת מניית דלק</p>
      </>,
      url: '',
    },
    {
      icon: 'top.svg',
      title: <>
        <p>כמה מיליארדים מכספי החוסכים</p>
        <p> הישראלים מושקעים בשווקים הסיניים?</p>
      </>,
      url: '',
    },
    {
      icon: 'lock.svg',
      title: <>
        <p>“קשה להבין לאן הכסף הולך”</p>
        <p>הסוד של עולם הפנסיה</p>
      </>,
      url: '',
    },
  ];
  return <ul className="external-items">
    {links.map(({icon, title, url}, key) => <li>
      <img src={`/svgs/${icon}`} />
      <a className="title" href={url}>{title}</a>
      <a className="play" href={url}><Play /></a>
    </li>)}
  </ul>
}
