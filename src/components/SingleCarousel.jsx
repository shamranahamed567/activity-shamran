import { PropTypes } from "prop-types";

function SingleCarousel({ item }) {
  return (
    <article className="p-6 rounded-xl bg-slate-50 bg-opacity-50 h-full">
      <h4 className="text-3xl font-semibold text-black z-50 mb-5">{item.title}</h4>
      <p>{item.description}</p>
    </article>
  )
}

SingleCarousel.propTypes = {
  item: PropTypes.object
}

export default SingleCarousel
