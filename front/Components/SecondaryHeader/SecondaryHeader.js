export default function SecondaryHeader({children, title, description}) {
  return <section className="secondary-header">
    <h2>{title}</h2>
    <p>{description}</p>
  </section>
}
