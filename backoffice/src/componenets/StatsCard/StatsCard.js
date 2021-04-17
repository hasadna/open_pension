import "./StatsCard.scss"
export default ({title, mainStat, gradColor = 'green', icon}) => {
  return <div className="card">

    <section className="upper">

      <section className="texts">
        <span className="title">{title}</span>
        <span className="main-stat">{mainStat}</span>
      </section>

      <div className={`icon bg-gradient-${gradColor}`}>
        {icon}
      </div>

    </section>
  </div>
}
