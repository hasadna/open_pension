import RoundedElement from "../RoundedElement/RoundedElement";
import {Button} from "../Form/Form";

export default ({inputs}) => {

  return <section className="filter-items">
    <RoundedElement>
      {inputs.map((input, key) => <div key={key}>{input}</div>)}
      <Button type={'info'}>Search</Button>
    </RoundedElement>
  </section>
}
