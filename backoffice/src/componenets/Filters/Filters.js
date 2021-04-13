import RoundedElement from "componenets/RoundedElement/RoundedElement";
import {Button} from "componenets/Form/Form";

export default ({inputs, handleSubmit}) => {

  return <section className="filter-items">
    <RoundedElement>
      {inputs.map((input, key) => <div key={key}>{input}</div>)}
      <Button type={'info'} onClick={handleSubmit}>Search</Button>
    </RoundedElement>
  </section>
}
