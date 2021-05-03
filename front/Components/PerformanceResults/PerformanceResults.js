import Table from "../Table/Table";
import {useState} from 'react';

export default function PerformanceResults({tracksInfo}) {
  const [selectedFilter, setSelectedFilter] = useState('last12Years');

  const graphsFilterOptions = {
    last3Months: '3 חוד׳ אחרונים',
    last6Months: '6 חוד׳ אחרונים',
    yearStart: 'תחילת שנה',
    last12Years: '12 חודשים אחרונים',
    last3Years: '3 שנים אחרונות',
    last5Years: '5 שנים אחרונות',
  };

  return <div className="performance-results">

    <h5>רשימת מסלולים</h5>
    <Table
      headers={[
        'מספר קרן',
        'שם הקרן',
        'יתרת נכסים',
        'תשואה שנתית',
        'ת.ממוצאות ב-3 שנים',
        'ת.ממוצאות ב-5 שנים',
        'שארפ',
      ]}
      rows={tracksInfo}
    />

    <h5 className="separator">משה מה לכתוב כאן?</h5>
    <div className="graph-wrapper">
      <ul >
        {Object.entries(graphsFilterOptions).map(([filterBy, title], key) => {
          const className = selectedFilter === filterBy ? 'active' : '';

          return <li key={key} className={className}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setSelectedFilter(filterBy);
            }}>{title}</a>
          </li>
        })}
      </ul>
    </div>
  </div>
}
