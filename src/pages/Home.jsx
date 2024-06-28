import React from "react";
import SimpleSlider from "../components/design/Slider";
import { questions, images } from "../constants/index";
import Faq from "../components/design/Faq";

function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="">
        <SimpleSlider
          value={images}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={false}
          className="h-[300px] w-full sm:h-[400px] lg:h-[450px] mx-auto rounded-3xl"
        />
      </div>
      <div className="my-10">
        <p className="heading text-center mb-5">Our Astrologers</p>
        <SimpleSlider
          value={images}
          slidesToShow={3}
          slidesToScroll={1}
          className="h-[150px] w-[150px] rounded-full sm:h-[180px] md:w-[220px] mx-auto"
        />
      </div>
      <div className="my-10">
        <p className="mt-10 sub-heading tracking-wide text-center">
          why is astrology important?
        </p>
        <p className="py-5 tracking-wide body-1">
          Purposes of astrology The original purpose of astrology, on the other
          hand, was to inform the individual of the course of his life on the
          basis of the positions of the planets and of the zodiacal signs (the
          12 astrological constellations) at the moment of his birth or
          conception.
        </p>
      </div>
      <div className="my-10">
        <Faq questions={questions} />
      </div>
    </div>
  );
}

export default Home;
