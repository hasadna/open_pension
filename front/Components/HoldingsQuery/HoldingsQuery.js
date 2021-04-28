import ButtonGroups from "../ButtonsGroup/ButtonsGroup";

export default function HoldingsQuery({company}) {
  return <div className="inner-page-content">
    <h3>רשימת חברות השקעה של {company}</h3>
    <h4>רבעון 4, ספטמבר 2019</h4>

    <ButtonGroups
      title={"בחרו את אפיק ההשקעה"}
      buttons={{
        pension: 'פנסיה',
        gemel: 'גמל',
        bituah: 'ביטוח'
      }}
    />
  </div>
}
