import ButtonGroups from "../ButtonsGroup/ButtonsGroup";

export default function PerformanceQuery({bodies, investmentPath, investmentTypes}) {
  return <div className="performance-query">
    <ButtonGroups
      title={"בחרו את אפיק ההשקעה"}
      description={'אפיק ההשקעה הוא סוג הביטוח הפנסיוני שלך'}
      buttons={investmentTypes} />

    <ButtonGroups
      title={"בחרו את מסלול ההשקעה"}
      description={'כל גוף משקיע את הכסף בהתאם לפרופיל של מחזיק הכסף'}
      buttons={investmentPath} />

    <ButtonGroups
      title={"בחר את הגוף שמייצג אותך"}
      description={'כל גוף משקיע את הכסף בהתאם לפרופיל של מחזיק הכסף. אפשר לבחור כמה גופים על מנת לבצע השוואה'}
      buttons={bodies}
      multiple={true}
    />
  </div>
}
