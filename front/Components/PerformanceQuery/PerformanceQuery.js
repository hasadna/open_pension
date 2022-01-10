import Dropdown from "../Dropdown/Dropdown";

export default function PerformanceQuery({dispatchQuery, bodies, subChannels, channels}) {

  const updateQueryHandler = (type, value) => {
    dispatchQuery({type: type, value})
    dispatchQuery({type: 'onlyUpdateGraph', value: false});
  }

  return <div className="performance-query">
    <Dropdown
      title={"בחרו את אפיק ההשקעה"}
      firstOption={"אפיק ההשקעה"}
      options={channels}
      description={'אפיק ההשקעה הוא סוג הביטוח הפנסיוני שלך'}
      selectHandler={(value) => {updateQueryHandler('investmentType', value)}}
    />

    <Dropdown
      title={"בחרו את מסלול ההשקעה"}
      firstOption={"מסלול ההשקעה"}
      options={subChannels}
      description={'כל גוף משקיע את הכסף בהתאם לפרופיל של מחזיק הכסף'}
      selectHandler={(value) => {updateQueryHandler('investmentPath', value)}}
      allowSearch={true}
    />

    <Dropdown
      title={"בחר את הגוף שמייצג אותך"}
      firstOption={"גוף מייצג"}
      options={bodies}
      description={'כל גוף משקיע את הכסף בהתאם לפרופיל של מחזיק הכסף. אפשר לבחור כמה גופים על מנת לבצע השוואה'}
      selectHandler={(value) => {updateQueryHandler('bodies', value)}}
      allowSearch={true}
      multiple={true}
    />
  </div>
}
