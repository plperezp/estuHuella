import '../css/btnNav.css'

function BtnNav(props) {
  return (
    <section class="portfolio-experiment">
      <a style={{ '--dynamic-color': props.color }}>
        <span class="text">{props.value}</span>
        <span class="line -right"></span>
        <span class="line -top"></span>
        <span class="line -left"></span>
        <span class="line -bottom"></span>
      </a>
    </section>
  )
}

export default BtnNav
