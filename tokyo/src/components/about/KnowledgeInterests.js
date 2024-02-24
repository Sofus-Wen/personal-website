import React from 'react';
import Slider from 'react-slick';

const companies = [
  { id: 1, title: "Company 1", image: "/assets/img/companies/company1.png" },
  { id: 2, title: "Company 2", image: "/assets/img/companies/company2.png" },
  { id: 3, title: "Company 3", image: "/assets/img/companies/company3.png" },
  { id: 4, title: "Company 4", image: "/assets/img/companies/company4.png" },
  { id: 5, title: "Company 5", image: "/assets/img/companies/company5.png" },
];

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {companies.map((company) => (
          <div key={company.id} className="company-slide">
            <img src={company.image} alt={company.title} />
            <h3>{company.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
