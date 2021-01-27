import React from "react";
import Slider from "react-slick";
import "../index.css";

function SlideComponent({ slide1, slide2 }) {
  console.log(slide1.length);
  console.log(slide2.length);
  var settings = {
    dots: true,
    slidesToShow: 3,
  };

  return (
    <div className="container">
      <Slider {...settings}>
        <div style={{ padding: "16px", border: "2px silid red" }}>
          <img src="http://placekitten.com/g/400/200" />
        </div>
        <div style={{ padding: "16px", border: "2px silid red" }}>
          <img src="http://placekitten.com/g/400/200" />
        </div>
        <div style={{ padding: "16px", border: "2px silid red" }}>
          <img src="http://placekitten.com/g/400/200" />
        </div>
      </Slider>
    </div>
  );
}

export default SlideComponent;
