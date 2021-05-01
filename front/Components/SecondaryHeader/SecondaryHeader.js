export default function SecondaryHeader({children, title, description, lastUpdate}) {
  return <section className="secondary-header">
    <h2>{title}</h2>
    {description}
    <span className="last-update">עידכון אחרון: {lastUpdate}</span>

    {children}
  </section>
}
