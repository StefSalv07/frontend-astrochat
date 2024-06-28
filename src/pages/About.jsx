import React from "react";
import SimpleSlider from "../components/design/Slider";
import { images } from "../constants/index";
import {
  decisionMaking,
  selfUnderstanding,
  relationAndCompatibility,
} from "../assets";

function About() {
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
      <div className="my-10 px-4 space-y-10 sm:space-y-5 ">
        {/* content 1 */}
        <div className="flex flex-col sm:grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <img
              src={selfUnderstanding}
              alt="Self-Understanding"
              className="rounded-3xl shadow-lg"
            />
          </div>
          <div className="sm:col-span-8 flex flex-col justify-center">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Self-Understanding and Personal Growth
            </p>
            <div className="h-1 bg-yellow-400 max-w-md mb-4"></div>
            <p className="text-base text-gray-600 tracking-wide">
              Astrology provides insights into personality traits, strengths,
              and weaknesses based on zodiac signs. This self-awareness can help
              individuals understand their behaviors and motivations, leading to
              personal growth.
            </p>
          </div>
        </div>
        {/* content 2 */}
        <div className="my-10 px-4">
          <div className="flex flex-col sm:grid sm:grid-cols-12 gap-6">
            <div className="sm:col-span-8 flex flex-col justify-center items-end text-right">
              <p className="text-2xl font-semibold text-gray-800 mb-2">
                Decision-Making
              </p>
              <div className="h-1 bg-yellow-400 w-36 mb-4"></div>
              <p className="text-base text-gray-600 tracking-wide">
                Many people consult their astrological charts for guidance in
                making important life decisions, such as choosing a career,
                finding a life partner, or making financial investments.
                Astrology can offer a sense of direction and timing for these
                decisions.
              </p>
            </div>
            <div className="sm:col-span-4">
              <img
                src={decisionMaking}
                alt=" Decision-Making"
                className="rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* content 3 */}
        <div className="flex flex-col sm:grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <img
              src={relationAndCompatibility}
              alt="    Relationships and Compatibility"
              className="rounded-3xl shadow-lg"
            />
          </div>
          <div className="sm:col-span-8 flex flex-col justify-center">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Relationships and Compatibility
            </p>
            <div className="h-1 bg-yellow-400 max-w-md mb-4"></div>
            <p className="text-base text-gray-600 tracking-wide">
              Astrology is often used to assess compatibility between partners,
              friends, and family members. Understanding the astrological
              dynamics between individuals can improve communication and
              relationships by highlighting potential areas of harmony and
              conflict.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
