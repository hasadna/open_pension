import ButtonGroups from "../ButtonsGroup/ButtonsGroup";
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
    
    {/*<ButtonGroups*/}
    {/*  title={"בחרו את אפיק ההשקעה"}*/}
    {/*  description={'אפיק ההשקעה הוא סוג הביטוח הפנסיוני שלך'}*/}
    {/*  buttons={channels}*/}
    {/*  selectHandler={(value) => {updateQueryHandler('investmentType', value)}}*/}
    {/*/>*/}

    <ButtonGroups
      title={"בחרו את מסלול ההשקעה"}
      description={'כל גוף משקיע את הכסף בהתאם לפרופיל של מחזיק הכסף'}
      buttons={subChannels}
      selectHandler={(value) => {updateQueryHandler('investmentPath', value)}}
    />

    <ButtonGroups
      title={"בחר את הגוף שמייצג אותך"}
      description={'כל גוף משקיע את הכסף בהתאם לפרופיל של מחזיק הכסף. אפשר לבחור כמה גופים על מנת לבצע השוואה'}
      buttons={bodies}
      multiple={true}
      selectHandler={(value) => {updateQueryHandler('bodies', value);}}
    />
  </div>
}
