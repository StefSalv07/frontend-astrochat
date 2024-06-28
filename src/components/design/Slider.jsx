import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({
  value,
  slidesToShow,
  slidesToScroll,
  className,
  autoplay,
}) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow || 4,
    slidesToScroll: slidesToScroll || 4,
    initialSlide: 0,
    autoplay: autoplay || false,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow === 1 ? 1 : 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slidesToShow === 1 ? 1 : 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: slidesToShow === 1 ? 1 : 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const customStyles = `

.slick-arrow:before {
 color: black;
  font-size: 50px;
}
.slick-prev, .slick-next {

  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.slick-prev:hover, .slick-next:hover {
  color:gray 
}

//responsive arrows size
/* Adjust styles for screens smaller than 768px */
@media only screen and (max-width: 768px) {
  .slick-prev:before, .slick-next:before {
    font-size: 40px; /* Smaller font size for medium screens */
  }
}

/* Adjust styles for screens smaller than 480px */
@media only screen and (max-width: 480px) {
  .slick-prev:before, .slick-next:before {
    font-size: 30px; /* Smaller font size for small screens */
  }
}

/* Adjust styles for screens smaller than 300px */
@media only screen and (max-width: 300px) {
  .slick-prev:before, .slick-next:before {
    font-size: 25px;
  }
}
.slider-container .slick-prev,
.slider-container .slick-next {
 
  color: #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
}

.slider-container .slick-prev {
  left: 20px;
    color: #000;
}

.slider-container .slick-next {
  right: 20px; 
}
`;

  return (
    <div className="slider-container">
      <style>{customStyles}</style>
      <Slider {...settings}>
        {value.map((image, index) => (
          <div key={index} className="py-5 items-center">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={className ? className : "w-full h-full object-cover"}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
