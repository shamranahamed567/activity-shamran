import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import VideoSlide from './components/VideoSlide';
import SingleCarousel from './components/SingleCarousel';

import backgroundFullscreen from "/background-fullscreen.jpg"
import backgroundMedium from "/background-medium.jpg"
import backgroundPhone from "/background-phone.jpg"

function App() {
  const scrollContainerRef = useRef(null)
  const [mySwiper, setMySwiper] = useState({})
  const [currentSlider, setCurrentSlider] = useState("slider 1")
  const [swiperIndex, setSwiperIndex] = useState(0)
  const [backgroundVideos, setBackgroundVideos] = useState([])
  const [carousel, setCarousel] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleWheel = (event) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;

      if (event.deltaY > 0 && swiperIndex <= backgroundVideos.length - 1) {
        mySwiper.slidePrev();
      } else if (event.deltaY < 0 && swiperIndex >= 0) {
        mySwiper.slideNext()
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/backgroundVideos.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setBackgroundVideos(result.background);
            setCarousel(result.carousel)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);
 
  if(error) {
    return (
      <div className='text-2xl text-red-500 font-medium py-3 px-6'>There is a error while fetching the data. {error}</div>
    )
  }

  if(loading) {
    return (
      <div className='text-2xl text-gray-500 font-medium py-3 px-6'>Loading please wait...</div>
    )
  }

  return (
    <>
      {currentSlider === "slider 1" && (
        <section className="h-screen relative animate-fadeout" ref={scrollContainerRef} onWheel={handleWheel}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          <Swiper
            effect={'fade'}
            navigation={true}
            modules={[EffectFade, Navigation]}
            className="mySwiper h-screen"
            direction="horizontal"
            mousewheel={true}
            onInit={(ev) => setMySwiper(ev)}
            onRealIndexChange={(swiperCore) => {
              setSwiperIndex(swiperCore.realIndex);
            }}
          >
            {backgroundVideos.map(video => (
              <SwiperSlide key={video.id}>
                <VideoSlide video={video} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-50" onClick={() => setCurrentSlider("slider 2")}>
            {arrowSvg}
          </button>
        </section>
      )}

      {currentSlider === "slider 2" && (
        <section className="h-screen relative animate-fade overflow-hidden">
          <img src={backgroundFullscreen} alt="Picture of the Moon" className='w-full h-full lg:block hidden object-cover animated-image' />
          <img src={backgroundMedium} alt="Picture of the Moon" className='w-full h-full md:block lg:hidden hidden object-cover animated-image' />
          <img src={backgroundPhone} alt="Picture of the Moon" className='w-full h-full md:hidden block object-cover animated-image' />
          <button className='uppercase absolute right-5 top-5 z-50 text-gray-200 font-medium text-lg hover:text-gray-300'>Discover More</button>
          
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            onInit={(ev) => setMySwiper(ev)}
            className="mySwiper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 smart-phone:carousel-low low-phone:carousel-phone sm:w-carousel z-50 h-1/3"
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              700: {
                slidesPerView: 2
              },
              1034: {
                slidesPerView: 3
              },
              1120: {
                slidesPerView: 4
              }
            }}
          >
            {carousel.map((item) => (
              <SwiperSlide key={item.id}>
                <SingleCarousel item={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button className='absolute top-1/2 transform -translate-y-1/2 phone:right-2.5 right-1 -rotate-90 z-50' onClick={() => mySwiper.slideNext()}>
            {rightArrow}
          </button>

          <button className='absolute top-1/2 transform -translate-y-1/2 phone:left-2.5 left-1 rotate-90 z-50' onClick={() => mySwiper.slidePrev()}>
            {rightArrow}
          </button>

          <button className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-50 rotate-180" onClick={() => setCurrentSlider("slider 1")}>
            {arrowSvg}
          </button>
        </section>
      )}
    </>
  )
}

export default App

const arrowSvg = <svg fill="#3d49b8" height="56px" width="56px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M498.837,65.628c-7.957-3.328-17.152-1.472-23.253,4.629L256,289.841L36.416,70.257 c-6.101-6.101-15.275-7.936-23.253-4.629C5.184,68.913,0,76.721,0,85.34v106.667c0,5.675,2.24,11.093,6.251,15.083 l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251L505.751,207.09 c4.011-3.989,6.251-9.408,6.251-15.083V85.34C512,76.721,506.816,68.913,498.837,65.628z"></path> </g> </g> </g></svg>

const rightArrow = <svg fill="#FFF" className='lg:w-10 lg:h-10 w-6 h-6 medium:w-8 medium:h-8' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M498.837,65.628c-7.957-3.328-17.152-1.472-23.253,4.629L256,289.841L36.416,70.257 c-6.101-6.101-15.275-7.936-23.253-4.629C5.184,68.913,0,76.721,0,85.34v106.667c0,5.675,2.24,11.093,6.251,15.083 l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251L505.751,207.09 c4.011-3.989,6.251-9.408,6.251-15.083V85.34C512,76.721,506.816,68.913,498.837,65.628z"></path> </g> </g> </g></svg>



