import '../css/btnNav.css'

function BtnNav(props) {
  return (
    <section className="portfolio-experiment">
      <p style={{ '--dynamic-color': props.color }}>
        <span className="text">{props.value}</span>
        <span className="line -right"></span>
        <span className="line -top"></span>
        <span className="line -left"></span>
        <span className="line -bottom"></span>
      </p>
    </section>
  )
}

export default BtnNav
