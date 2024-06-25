import { PropTypes } from "prop-types";

function VideoSlide({ video }) {
  return (
    <>
      <video muted autoPlay={true} loop className="w-full h-full object-fill">
        <source src={video.url} type={video.videoType} />
      </video>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center text-5xl font-bold mb-4 text-black text-animation w-full block">{video.heading}</h1>
        <p className="text-lg text-center font-normal text-black block description-animation">{video.description}</p>
      </div>
    </>
  )
}

VideoSlide.propTypes = {
  video: PropTypes.object
}

export default VideoSlide
