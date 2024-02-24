import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Ensure you import Swiper styles
import { sliderProps } from "../../sliderProps";

const testimonialData = [
  {
    id: 1,
    authorImage: "assets/img/companies/company1.png",
  },
  {
    id: 2,
    authorImage: "assets/img/companies/company2.png",
  },
  {
    id: 3,
    authorImage: "assets/img/companies/company3.png",
  },
  {
    id: 4,
    authorImage: "assets/img/companies/company4.png",
  },
  {
    id: 5,
    authorImage: "assets/img/companies/company5.png",
  },
];

const Testimonials = () => {
  return (
    <div className="tokyo_tm_testimonials w-full h-auto clear-both float-left py-[100px] px-0">
      <div className="container">
        <div id="testimonials-swiper-container" className="list w-full h-auto clear-both float-left overflow-hidden">
        <Swiper
        {...sliderProps.testimonial}
        spaceBetween={30}
        slidesPerView={3} // Display 3 logos at a time
        loop={true}
        centeredSlides={true}
        className="m-0 list-none cursor-e-resize"
        // Additional Swiper settings as needed
        >
        {testimonialData.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center items-center">
            <img src={item.authorImage} alt={`Company ${item.id}`} className="company-image" />
          </SwiperSlide>
        ))}
        </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
