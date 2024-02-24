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
        <div className="list w-full h-auto clear-both float-left overflow-hidden">
          <Swiper
            {...sliderProps.testimonial}
            className="m-0 list-none cursor-e-resize"
            spaceBetween={50} // Adjust the space between slides
            slidesPerView={5} // Adjust the number of slides per view as needed
          >
            {testimonialData.map((item) => (
              <SwiperSlide key={item.id} className="flex justify-center">
                <img
                  src={item.authorImage}
                  alt={`Company ${item.id}`}
                  className="company-image" // Use a class to control the size
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
